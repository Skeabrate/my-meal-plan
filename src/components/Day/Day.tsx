import { useMemo, useState } from 'react';
import { useFetchMealsSections } from 'api/pscale/useFetchMealsSections';
import { useMutation } from 'hooks/useMutation';
import PlusSvg from 'assets/SVG/Plus';
import ErrorBoundary from 'templates/ErrorBoundary';
import OpenInput from 'components/OpenInput/OpenInput';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealsSection from './MealsSection/MealsSection';
import { useAlertModal } from 'components/AlertModal/AlertModal';

const Day = ({ mealPlanId, dayName }: { mealPlanId: string | undefined; dayName: string }) => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  const {
    mealsSections,
    isLoading: isLoadingFetchMealsSections,
    refetch,
    isRefetching,
    isError: isErrorFetchMealsSections,
    error: errorFetchMealsSections,
  } = useFetchMealsSections(mealPlanId, dayName);

  const {
    mutation: createMealsSection,
    isLoading: isLoadingCreateMealsSection,
    isError: isErrorCreateMealsSection,
    error: errorCreateMealsSection,
  } = useMutation('/api/createMealsSection', () => {
    refetch();
  });

  const {
    mutation: deleteMealsSection,
    isLoading: isLoadingDeleteMealsSection,
    isError: isErrorDeleteMealsSection,
    error: errorDeleteMealsSection,
  } = useMutation('/api/deleteMealsSection', () => {
    refetch();
  });

  const actionErrors = useMemo(
    () => [
      { isError: isErrorCreateMealsSection, error: errorCreateMealsSection },
      { isError: isErrorDeleteMealsSection, error: errorDeleteMealsSection },
    ],
    [
      isErrorCreateMealsSection,
      errorCreateMealsSection,
      isErrorDeleteMealsSection,
      errorDeleteMealsSection,
    ]
  );

  useAlertModal(actionErrors);

  return (
    <div>
      <div style={{ padding: '15px 0 10px' }}>
        <UnderlinedButton
          label={
            <>
              <PlusSvg /> Add new meals section
            </>
          }
          onClick={() => setIsInputOpen((isOpen) => !isOpen)}
          isGreen
        />
      </div>

      {isInputOpen && (
        <OpenInput
          label='Add new meal section'
          updateMealPLans={(inputValue) => {
            createMealsSection({
              mealPlanId,
              dayName,
              dayId: mealsSections?.length && mealsSections[0].dayId,
              mealsSectionName: inputValue,
            });
            setIsInputOpen(false);
          }}
          placeholder='E.g. Breakfast...'
        />
      )}

      <ErrorBoundary
        isLoading={
          isLoadingFetchMealsSections ||
          isLoadingCreateMealsSection ||
          isLoadingDeleteMealsSection ||
          isRefetching
        }
        isError={isErrorFetchMealsSections}
        error={errorFetchMealsSections}
      >
        {mealsSections?.length ? (
          mealsSections?.map((mealsSection) => (
            <MealsSection
              key={mealsSection.id}
              mealsSection={mealsSection}
              deleteMealsSection={deleteMealsSection}
            />
          ))
        ) : (
          <p>Add your first meals section.</p>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Day;
