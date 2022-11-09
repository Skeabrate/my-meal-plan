import { useContext, useState } from 'react';
import { useFetchMealPlans } from 'api/mealdb/useFetchMealPlanMeals';
import { MealPlansContext } from 'context/MealPlansContext';
import OpenInput from 'components/OpenInput/OpenInput';
import Loading from 'components/Loading/Loading';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealsSection from './MealsSection/MealsSection';

const MealPlan = ({ activeDay }: { activeDay: string }) => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  const { currentMealPlan, addNewMealSection } = useContext(MealPlansContext);

  const mealPlansInCurrentDay =
    currentMealPlan?.days[activeDay as keyof typeof currentMealPlan.days] || [];
  const { fetchedMealPlans, isLoading, error } = useFetchMealPlans(mealPlansInCurrentDay);

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
              addNewMealSection(inputValue, activeDay);
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
      ) : fetchedMealPlans.length ? (
        fetchedMealPlans.map((mealsSection) => (
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
