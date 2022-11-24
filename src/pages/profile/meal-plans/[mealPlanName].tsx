import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import * as Styled from 'styles/profile/meal-plans/mealPlanName.styles';
import prisma from 'lib/prismadb';
import { MealPlanType } from 'types/pscale/MealPlanType';
import { useTabs } from 'hooks/useTabs';
import { useMutation } from 'hooks/useMutation';
import { DAYS } from 'utils/days';
import { getDays } from 'utils/getDays';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayout from 'layouts/ProbileTabLayout/ProbileTabLayout';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealPlanComponent from 'components/MealPlan/MealPlan';
import Loading from 'components/Loading/Loading';

const MealPlanName = ({ mealPlan }: { mealPlan: MealPlanType }) => {
  const [activeDetailsHelper, setActiveDetailsHelper] = useState(DAYS[0]);
  const tabs = DAYS.map((day) => ({
    id: day,
    label: day,
    Component: (
      <MealPlanComponent
        mealPlan={mealPlan}
        activeTab={activeDetailsHelper}
      />
    ),
  }));

  const { activeDetails, setActiveDetails, selectedTab } = useTabs(tabs);

  const router = useRouter();

  const {
    mutation: deleteMealPlan,
    isLoading,
    isError,
    error,
  } = useMutation('/api/deleteMealPlan', () => {
    router.push('/profile/meal-plans');
  });

  return (
    <ProfileTabLayout
      noAnimation
      label='Meal Plan Details:'
    >
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p>An error occurred: {error}</p>
      ) : (
        <>
          <Styled.MealPlanTitle>
            <h2>{mealPlan.mealPlanName}</h2>
            <UnderlinedButton
              label='Delete meal plan'
              onClick={() =>
                deleteMealPlan({
                  mealPlanId: mealPlan.id,
                })
              }
            />
          </Styled.MealPlanTitle>

          <Styled.DaysBar>
            {DAYS.map((day) => (
              <li key={day}>
                <Styled.DaysBarButton
                  $isActive={day === activeDetails}
                  onClick={() => {
                    setActiveDetails(day);
                    setActiveDetailsHelper(day);
                  }}
                >
                  {day}
                </Styled.DaysBarButton>
              </li>
            ))}
          </Styled.DaysBar>

          {/* MealPlan Component */}
          {selectedTab}
        </>
      )}
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
