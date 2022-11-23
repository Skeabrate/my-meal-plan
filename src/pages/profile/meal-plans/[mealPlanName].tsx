import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import * as Styled from 'styles/profile/meal-plans/mealPlanName.styles';
import { MealPlanType } from 'types/pscale/MealPlanType';
import prisma from 'lib/prismadb';
import { useDeleteMealPlan } from 'api/pscale/MealPlan/useDeleteMealPlan';
import { useTabs } from 'hooks/useTabs';
import { DAYS } from 'utils/days';
import { getDays } from 'utils/getDays';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayout from 'layouts/ProbileTabLayout/ProbileTabLayout';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealPlanComponent from 'components/MealPlan/MealPlan';

const MealPlanName = ({ mealPlan }: { mealPlan: MealPlanType }) => {
  const [activeDaysHelper, setActiveDaysHelper] = useState(DAYS[0]);
  const tabs = DAYS.map((day) => ({
    id: day,
    label: day,
    Component: (
      <MealPlanComponent
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

    const days = await getDays(mealPlan.id);

    return {
      props: {
        mealPlan: {
          id: mealPlan.id,
          mealPlanName: mealPlan.mealPlanName,
          days,
        },
      },
    };
  }
}

MealPlanName.Layout = ProfileLayout;
MealPlanName.requireAuth = true;
