import { useState } from 'react';
import { MealPlansInCurrentDayType, useFetchMealPlanMeals } from 'api/mealdb/useFetchMealPlanMeals';
import OpenInput from 'components/OpenInput/OpenInput';
import Loading from 'components/Loading/Loading';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealsSection from './MealsSection/MealsSection';

const MealPlan = ({
  activeDay,
  mealPlansInCurrentDay,
}: {
  activeDay: string;
  mealPlansInCurrentDay: MealPlansInCurrentDayType[];
}) => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  const { fetchedMeals, isLoading, error } = useFetchMealPlanMeals(mealPlansInCurrentDay);

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
              setIsInputOpen(false);
            }}
            placeholder='E.g. Breakfast...'
          />
        )}
      </div>

      {isLoading ? (
        <Loading />
      ) : error?.message ? (
        <p>Error occured.</p>
      ) : fetchedMeals.length ? (
        fetchedMeals.map((mealsSection) => (
          <MealsSection
            key={mealsSection.id}
            mealsSection={mealsSection}
            activeDay={activeDay}
          />
        ))
      ) : (
        <p>Add your first meal section!</p>
      )}
    </div>
  );
};

export default MealPlan;
