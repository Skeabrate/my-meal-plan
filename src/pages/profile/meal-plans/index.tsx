import { useMemo, useState } from 'react';
import Link from 'next/link';
import * as Styled from 'styles/profile/meal-plans/index.styles';
import { useSession } from 'next-auth/react';
import { useFetchMealPlans } from 'api/pscale/useFetchMealPlans';
import { useMutation } from 'hooks/useMutation';
import PlusSvg from 'assets/SVG/Plus.svg';
import ErrorBoundary from 'templates/ErrorBoundary';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayout from 'layouts/ProbileTabLayout/ProbileTabLayout';
import OpenInput from 'components/OpenInput/OpenInput';
import { useInfoModal } from 'components/InfoModal/InfoModal';

const MealPlans = () => {
  const [isAddMealPLanInputOpen, setIsAddMealPLanInputOpen] = useState(false);

  const { data: session } = useSession();

  const {
    mealPlans,
    isLoading: isLoadingMealPlans,
    refetch,
    isRefetching,
    isError: isErrorFetchMealPlans,
    error: errorFetchMealPlans,
  } = useFetchMealPlans();

  const {
    mutation: createMealPlan,
    isLoading: isLoadingCreateMealPlan,
    isError: isErrorCreateMealPlan,
    error: errorCreateMealPlan,
  } = useMutation('/api/createMealPlan', () => {
    refetch();
  });

  const {
    mutation: deleteMealPlan,
    isLoading: isLoadingDeleteMealPlan,
    isError: isErrorDeleteMealPlan,
    error: errorDeleteMealPlan,
  } = useMutation('/api/deleteMealPlan', () => {
    refetch();
  });

  const actionErrors = useMemo(
    () => [
      { isError: isErrorCreateMealPlan, error: errorCreateMealPlan },
      { isError: isErrorDeleteMealPlan, error: errorDeleteMealPlan },
    ],
    [isErrorCreateMealPlan, errorCreateMealPlan, isErrorDeleteMealPlan, errorDeleteMealPlan]
  );

  useInfoModal(actionErrors);

  return (
    <ProfileTabLayout label='My Meal Plans:'>
      {isAddMealPLanInputOpen && (
        <OpenInput
          label='Add meal plan'
          placeholder='Meal plan name...'
          updateMealPLans={(inputValue) => {
            createMealPlan({
              userId: session?.user.id,
              mealPlanName: inputValue,
            });
            setIsAddMealPLanInputOpen(false);
          }}
        />
      )}

      <ErrorBoundary
        isLoading={
          isLoadingMealPlans || isLoadingCreateMealPlan || isLoadingDeleteMealPlan || isRefetching
        }
        isError={isErrorFetchMealPlans}
        error={errorFetchMealPlans}
      >
        {mealPlans?.length ? (
          <Styled.MealPlansList>
            {mealPlans.map(({ id, mealPlanName }, index) => (
              <li key={mealPlanName}>
                <Link href={`/profile/meal-plans/loading/meal-plan?mealPlanName=${mealPlanName}`}>
                  <Styled.ListItem>
                    <span>{index < 9 ? `0${index + 1}` : index + 1}:</span>
                    {mealPlanName}
                  </Styled.ListItem>
                </Link>

                <Styled.DeleteMealPLanButton
                  aria-label='delete meal plan'
                  title='Delete meal plan'
                  onClick={() => {
                    deleteMealPlan({ mealPlanId: id });
                  }}
                >
                  <PlusSvg />
                </Styled.DeleteMealPLanButton>
              </li>
            ))}
          </Styled.MealPlansList>
        ) : (
          <>
            <h3>You don't have any meal plans yet.</h3>
            <p>Add your first meal plan!</p>
          </>
        )}

        <Styled.AddMealPlanButton
          onClick={() => setIsAddMealPLanInputOpen((isInputOpen) => !isInputOpen)}
          aria-label='Add meal plan'
          title='Add meal plan'
          $isAddMealPLanInputOpen={isAddMealPLanInputOpen}
        >
          <PlusSvg />
        </Styled.AddMealPlanButton>
      </ErrorBoundary>
    </ProfileTabLayout>
  );
};

export default MealPlans;

MealPlans.Layout = ProfileLayout;
MealPlans.requireAuth = true;
