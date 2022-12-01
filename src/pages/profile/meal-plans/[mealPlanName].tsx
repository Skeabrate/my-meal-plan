import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import * as Styled from 'styles/profile/meal-plans/mealPlanName.styles';
import { useTabs } from 'hooks/useTabs';
import { useMutation } from 'hooks/useMutation';
import { useResizeWindow } from 'hooks/useResizeWindow';
import { DAYS, ShortenedDay } from 'utils/days';
import { useFetchMealPlan } from 'api/pscale/useFetchMealPlan';
import ErrorBoundary from 'templates/ErrorBoundary';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayout from 'layouts/ProbileTabLayout/ProbileTabLayout';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import Day from 'components/Day/Day';
import { useInfoModal } from 'components/InfoModal/InfoModal';

const MealPlanName = () => {
  const router = useRouter();

  const {
    mealPlan,
    isLoading: isLoadingFetchMealPlan,
    isRefetching: isRefetchingMealPlan,
    isError: isErrorFetchMealPlan,
    error: errorFetchMealPlan,
  } = useFetchMealPlan(router.query.mealPlanName as string);

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

  const [activeDetailsHelper, setActiveDetailsHelper] = useState<ShortenedDay>(DAYS[0].shortened);
  const tabs = DAYS.map(({ value, shortened }) => ({
    id: shortened,
    label: value, // not used in this tabs / only id
    Component: (
      <Day
        mealPlanId={mealPlan?.id}
        dayName={activeDetailsHelper}
      />
    ),
  }));

  const { activeDetails, setActiveDetails, selectedTab } = useTabs(tabs);

  const { windowWidth } = useResizeWindow();

  return (
    <ProfileTabLayout
      noAnimation
      label='Meal Plan Details:'
    >
      <ErrorBoundary
        isLoading={isLoadingFetchMealPlan || isRefetchingMealPlan || isLoadingDeleteMealPlan}
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
          {DAYS.map(({ value, shortened }) => (
            <li key={shortened}>
              <Styled.DaysBarButton
                $isActive={shortened === activeDetails}
                onClick={() => {
                  setActiveDetails(shortened);
                  setActiveDetailsHelper(shortened);
                }}
              >
                {windowWidth > 500 ? value : shortened}
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

MealPlanName.Layout = ProfileLayout;
MealPlanName.requireAuth = true;
