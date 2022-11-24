import { useEffect, useState } from 'react';
import { useFetchMealsFromMealsSections } from 'api/mealdb/useFetchMealsFromMealsSections';
import { useCreateMealsSection } from 'api/pscale/MealPlan/MealsSection/useCreateMealsSection';
import OpenInput from 'components/OpenInput/OpenInput';
import Loading from 'components/Loading/Loading';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealsSection from './MealsSection/MealsSection';
import { MealPlanType } from 'types/pscale/MealPlanType';

const MealPlan = ({ mealPlan, activeTab }: { mealPlan: MealPlanType; activeTab: string }) => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  const activeDay = mealPlan.days.find(({ dayName }) => dayName === activeTab);

  const { mealsSections, isLoading, error, refetch } = useFetchMealsFromMealsSections(
    activeDay?.mealsSections || []
  );

  const { createMealsSection } = useCreateMealsSection();

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

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p>Error occured.</p>
      ) : mealsSections?.length ? (
        mealsSections.map((mealsSection) => (
          <MealsSection
            key={mealsSection.id}
            activeDayId={activeDay!.id}
            mealsSection={mealsSection}
          />
        ))
      ) : (
        <p>Add your first meal section!</p>
      )}
    </div>
  );
};

export default MealPlan;
