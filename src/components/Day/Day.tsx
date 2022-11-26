import { useState } from 'react';
import { useFetchMealsSections } from 'api/pscale/useFetchMealsSections';
import { useMutation } from 'hooks/useMutation';
import Loading from 'components/Loading/Loading';
import OpenInput from 'components/OpenInput/OpenInput';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealsSection from './MealsSection/MealsSection';

const Day = ({
  mealPlanId,
  dayName,
  dayId,
}: {
  mealPlanId: string | undefined;
  dayName: string;
  dayId: string | undefined;
}) => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  const { mealsSections, isLoading, refetch, isRefetching, isError, error } = useFetchMealsSections(
    mealPlanId,
    dayName
  );

  const { mutation: deleteMealsSection, isLoading: isLoadingDeleteMealsSection } = useMutation(
    '/api/deleteMealsSection',
    () => {
      refetch();
    }
  );

  const { mutation: createMealsSection, isLoading: isLoadingCreateMealsSection } = useMutation(
    '/api/createMealsSection',
    () => {
      refetch();
    }
  );

  return (
    <div>
      <div style={{ padding: '15px 0 10px' }}>
        <UnderlinedButton
          label='Add new meals section'
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
              dayId,
              dayName,
              mealsSectionName: inputValue,
            });
            setIsInputOpen(false);
          }}
          placeholder='E.g. Breakfast...'
        />
      )}

      {isLoading || isLoadingCreateMealsSection || isLoadingDeleteMealsSection || isRefetching ? (
        <Loading />
      ) : mealsSections?.length ? (
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
    </div>
  );
};

export default Day;
