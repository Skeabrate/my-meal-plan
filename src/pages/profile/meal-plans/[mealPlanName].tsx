import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { dehydrate, QueryClient } from 'react-query';
import * as Styled from 'styles/profile/meal-plans/mealPlanName.styles';
import { useTabs } from 'hooks/useTabs';
import { useMutation } from 'hooks/useMutation';
import { DAYS } from 'utils/days';
import { MealPlanType } from 'types/MealPlanTypes';
import { fetchMealPlan, useFetchMealPlan } from 'api/pscale/useFetchMealPlan';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayout from 'layouts/ProbileTabLayout/ProbileTabLayout';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealPlanComponent from 'components/MealPlan/MealPlan';
import Loading from 'components/Loading/Loading';

const MealPlanName = ({ userEmail, mealPlanName }: { userEmail: string; mealPlanName: string }) => {
  const router = useRouter();

  const {
    mealPlan,
    isLoading: isLoadingFetchMealPlan,
    refetch,
  } = useFetchMealPlan(userEmail, mealPlanName);

  const { mutation: deleteMealPlan, isLoading: isLoadingDeleteMealPlan } = useMutation(
    '/api/deleteMealPlan',
    () => {
      router.push('/profile/meal-plans');
    }
  );

  const [activeDetailsHelper, setActiveDetailsHelper] = useState(DAYS[0]);
  const tabs = DAYS.map((day) => ({
    id: day,
    label: day,
    Component: (
      <MealPlanComponent
        mealPlan={mealPlan as MealPlanType}
        activeTab={activeDetailsHelper}
        refetch={refetch}
      />
    ),
  }));
  const { activeDetails, setActiveDetails, selectedTab } = useTabs(tabs);

  return (
    <ProfileTabLayout
      noAnimation
      label='Meal Plan Details:'
    >
      {isLoadingFetchMealPlan || isLoadingDeleteMealPlan ? (
        <Loading />
      ) : mealPlan ? (
        <>
          <Styled.MealPlanTitle>
            <h2>{mealPlan?.mealPlanName}</h2>
            <UnderlinedButton
              label='Delete meal plan'
              onClick={() =>
                deleteMealPlan({
                  mealPlanId: mealPlan?.id,
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

          {/* MealPlanComponent */}
          {selectedTab}
        </>
      ) : (
        <p>Meal plan not found</p>
      )}
    </ProfileTabLayout>
  );
};

export default MealPlanName;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const queryClient = new QueryClient();

  const mealPlanName = context.params?.mealPlanName as string;
  const userEmail = session?.user.email as string;

  await queryClient.prefetchQuery('fetchMealPlan', () => fetchMealPlan(userEmail, mealPlanName));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      mealPlanName,
      userEmail,
    },
  };
}

MealPlanName.Layout = ProfileLayout;
MealPlanName.requireAuth = true;
