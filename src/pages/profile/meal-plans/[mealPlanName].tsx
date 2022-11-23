import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import * as Styled from 'styles/profile/meal-plans/mealPlanName.styles';
import prisma from 'lib/prismadb';
import { useDeleteMealPlan } from 'api/pscale/MealPlan/useDeleteMealPlan';
import { useTabs } from 'hooks/useTabs';
import { DAYS } from 'utils/days';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayout from 'layouts/ProbileTabLayout/ProbileTabLayout';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealPlan from 'components/MealPlan/MealPlan';

const MealPlanName = ({ mealPlan }) => {
  const [activeDaysHelper, setActiveDaysHelper] = useState(DAYS[0]);
  const tabs = DAYS.map((day) => ({
    id: day,
    label: day,
    Component: (
      <MealPlan
        mealPlan={mealPlan}
        activeTab={activeDaysHelper}
      />
    ),
  }));

  const { activeDetails, selectedTab, setActiveDetails } = useTabs(tabs);

  const { deleteMealPlan } = useDeleteMealPlan();

  const router = useRouter();

  return (
    <ProfileTabLayout
      noAnimation
      label='Meal Plan Details:'
    >
      <Styled.MealPlanTitle>
        <h2>{mealPlan.mealPlanName}</h2>
        <UnderlinedButton
          label='Delete meal plan'
          onClick={() => deleteMealPlan(mealPlan.id).then(() => router.push('/profile/meal-plans'))}
        />
      </Styled.MealPlanTitle>

      <Styled.DaysBar>
        {DAYS.map((day) => (
          <li key={day}>
            <Styled.DaysBarButton
              $isActive={day === activeDetails}
              onClick={() => {
                setActiveDetails(day);
                setActiveDaysHelper(day);
              }}
            >
              {day}
            </Styled.DaysBarButton>
          </li>
        ))}
      </Styled.DaysBar>

      {/* MealPlan */}
      {selectedTab}
    </ProfileTabLayout>
  );
};

export default MealPlanName;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  const mealPlanName = context.params?.mealPlanName as string;
  const userEmail = session?.user.email as string;

  if (mealPlanName && userEmail) {
    const mealPlan = await prisma.mealPlan.findFirst({
      where: {
        mealPlanName,
        userEmail,
      },
    });

    if (!mealPlan)
      return {
        notFound: true,
      };

    const days = await prisma.days.findMany({
      where: {
        mealPlanId: mealPlan.id,
      },
    });

    if (!days) {
      return {
        props: {
          mealPlan: {
            id: mealPlan.id,
            mealPlanName: mealPlan.mealPlanName,
          },
        },
      };
    }

    const getMealsSectionsInAllDays = days.map(({ id, dayName }) => {
      return {
        id,
        dayName,
        mealsSections: prisma.mealsSection.findMany({
          where: {
            Days: {
              id,
              dayName,
            },
          },
        }),
      };
    });

    let daysInMealPlan = [];

    for await (const {
      id: dayId,
      dayName,
      mealsSections: mealsSectionsPromise,
    } of getMealsSectionsInAllDays) {
      const getMealsSections = await Promise.resolve(mealsSectionsPromise);

      const mealsInMealsSections = getMealsSections.map(({ id, mealsSectionName }) => {
        return {
          id,
          mealsSectionName,
          meals: prisma.meal.findMany({
            where: {
              mealsSectionId: id,
            },
          }),
        };
      });

      let mealsSections = [];

      for await (const { id, mealsSectionName, meals: mealsPromise } of mealsInMealsSections) {
        const mealsResolved = await Promise.resolve(mealsPromise);

        mealsSections.push({
          id,
          mealsSectionName,
          meals: mealsResolved.map(({ id, mealId }) => ({ id, mealId })),
        });
      }

      daysInMealPlan.push({
        id: dayId,
        dayName,
        mealsSections,
      });
    }

    return {
      props: {
        mealPlan: {
          id: mealPlan.id,
          mealPlanName: mealPlan.mealPlanName,
          days: daysInMealPlan,
        },
      },
    };
  }
}

MealPlanName.Layout = ProfileLayout;
MealPlanName.requireAuth = true;
