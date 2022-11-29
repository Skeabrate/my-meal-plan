import { useMemo, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { dehydrate, QueryClient } from 'react-query';
import * as Styled from 'styles/profile/meal-plans/mealPlanName.styles';
import { useTabs } from 'hooks/useTabs';
import { useMutation } from 'hooks/useMutation';
import { DAYS } from 'utils/days';
import { fetchMealPlan, useFetchMealPlan } from 'api/pscale/useFetchMealPlan';
import ErrorBoundary from 'templates/ErrorBoundary';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayout from 'layouts/ProbileTabLayout/ProbileTabLayout';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import Day from 'components/Day/Day';
import { useInfoModal } from 'components/InfoModal/InfoModal';

const MealPlanName = ({ userEmail, mealPlanName }: { userEmail: string; mealPlanName: string }) => {
  const router = useRouter();

  const {
    mealPlan,
    isLoading: isLoadingFetchMealPlan,
    isError: isErrorFetchMealPlan,
    error: errorFetchMealPlan,
  } = useFetchMealPlan(userEmail, mealPlanName);

  const {
    mutation: deleteMealPlan,
    isLoading: isLoadingDeleteMealPlan,
    isError,
    error,
  } = useMutation('/api/deleteMealPlan', () => {
    router.push('/profile/meal-plans');
  });

  const actionErrors = useMemo(() => [{ isError, error }], [isError, error]);

  useInfoModal(actionErrors);

  const [activeDetailsHelper, setActiveDetailsHelper] = useState(DAYS[0]);
  const tabs = DAYS.map((day) => ({
    id: day,
    label: day,
    Component: (
      <Day
        mealPlanId={mealPlan?.id}
        dayName={activeDetailsHelper}
      />
    ),
  }));

  const { activeDetails, setActiveDetails, selectedTab } = useTabs(tabs);

  return (
    <ProfileTabLayout
      noAnimation
      label='Meal Plan Details:'
    >
      <ErrorBoundary
        isLoading={isLoadingFetchMealPlan || isLoadingDeleteMealPlan}
        isError={isErrorFetchMealPlan}
        error={errorFetchMealPlan}
      >
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

        {selectedTab}
      </ErrorBoundary>
    </ProfileTabLayout>
  );
};

export default MealPlanName;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const queryClient = new QueryClient();

  if (!session)
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/signin',
      },
      props: {},
    };

  const mealPlanName = context.params?.mealPlanName as string;
  const userEmail = session?.user.email as string;

  await queryClient.prefetchQuery(['fetchMealPlan', mealPlanName], () =>
    fetchMealPlan(userEmail, mealPlanName)
  );

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
