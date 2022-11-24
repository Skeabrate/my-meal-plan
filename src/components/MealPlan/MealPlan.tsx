import { useState } from 'react';
import { useFetchMealsFromMealsSections } from 'api/mealdb/useFetchMealsFromMealsSections';
import OpenInput from 'components/OpenInput/OpenInput';
import Loading from 'components/Loading/Loading';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealsSection from './MealsSection/MealsSection';
import { MealPlanType } from 'types/pscale/MealPlanType';
import { useMutation } from 'hooks/useMutation';

const MealPlan = ({
  mealPlan,
  activeTab,
  refetch,
}: {
  mealPlan: MealPlanType;
  activeTab: string;
  refetch: () => void;
}) => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  const activeDay = mealPlan.days.find(({ dayName }) => dayName === activeTab);

  const { mealsSections, isLoading: isLoadingFetchMeals } = useFetchMealsFromMealsSections(
    activeDay?.mealsSections || []
  );

  const { mutation: createMealsSection, isLoading: isLoadingCreateMealsSection } = useMutation(
    '/api/createMealsSection',
    () => {
      refetch();
    }
  );

  const { mutation: deleteMealsSection, isLoading: isLoadingDeleteMealsSection } =
    useMutation('/api/deleteMealsSection');

  return (
    <div>
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
                mealPlanId: mealPlan.id,
                mealsSectionName: inputValue,
                activeDayId: activeDay?.id,
                activeDayName: activeTab,
              });
              setIsInputOpen(false);
            }}
            placeholder='E.g. Breakfast...'
          />
        )}
      </div>

      {isLoadingFetchMeals || isLoadingCreateMealsSection ? (
        <Loading />
      ) : mealsSections?.length ? (
        mealsSections.map((mealsSection) => (
          <MealsSection
            key={mealsSection.id}
            activeDayId={activeDay!.id}
            mealsSection={mealsSection}
            deleteMealsSection={deleteMealsSection}
            refetch={refetch}
          />
        ))
      ) : (
        <p>Add your first meal section!</p>
      )}
    </div>
  );
};

export default MealPlan;
