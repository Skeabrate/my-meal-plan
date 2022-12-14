import { useContext, useEffect, useMemo } from 'react';
import * as Styled from './Meals.styles';
import { useFetchMealsFromMealsSection } from 'api/pscale/useFetchMealsFromMealsSection';
import { useMutation } from 'hooks/useMutation';
import { AlertModalContext } from 'context/AlertModalContext';
import ErrorBoundary from 'templates/ErrorBoundary';
import { useAlertModal } from 'components/AlertModal/AlertModal';
import { MEAL_ADDED_SUCCESSFULLY } from 'components/AddingMealModal/AddingMealModal';
import Meal from './Meal/Meal';

const Meals = ({ mealsSectionId }: { mealsSectionId: string }) => {
  const {
    meals,
    isLoading,
    refetch,
    isRefetching,
    isError: isErrorFetchMealsFromMealsSection,
    error: errorFetchMealsFromMealsSection,
  } = useFetchMealsFromMealsSection(mealsSectionId);

  const {
    mutation: deleteMealFromMealsSection,
    isLoading: isLoadingDeleteMealFromMealsSection,
    isError: isErrorDeleteMealFromMealsSection,
    error: errorDeleteMealFromMealsSection,
  } = useMutation('/api/deleteMealFromMealsSection', () => {
    refetch();
  });

  const actionErrors = useMemo(
    () => [{ isError: isErrorDeleteMealFromMealsSection, error: errorDeleteMealFromMealsSection }],
    [isErrorDeleteMealFromMealsSection, errorDeleteMealFromMealsSection]
  );
  useAlertModal(actionErrors);

  const { alertModal } = useContext(AlertModalContext);
  useEffect(() => {
    if (alertModal.message === MEAL_ADDED_SUCCESSFULLY) {
      refetch();
    }
  }, [alertModal.message, refetch]);

  return (
    <ErrorBoundary
      isLoading={isLoading || isRefetching || isLoadingDeleteMealFromMealsSection}
      loadingHeight={155}
      isError={isErrorFetchMealsFromMealsSection}
      error={errorFetchMealsFromMealsSection}
    >
      {meals?.length ? (
        <Styled.MealsGrid>
          {meals.map(({ id, mealId }) => (
            <li key={id}>
              <Meal
                mealId={mealId}
                deleteHandler={() => deleteMealFromMealsSection({ mealId: id })}
              />
            </li>
          ))}
        </Styled.MealsGrid>
      ) : (
        <Styled.Info>You don't have any meals in this meals section.</Styled.Info>
      )}
    </ErrorBoundary>
  );
};

export default Meals;
