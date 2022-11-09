import { useContext } from 'react';
import { MealPlansContext } from 'context/MealPlansContext';
import CurrentMealPlan from './CurrentMealPlan/CurrentMealPlan';
import MealPlansList from './MealPlansList/MealPlansList';

const MealPlans = () => {
  const { currentMealPlan } = useContext(MealPlansContext);

  return (
    <section>
      <header>
        <h1>My Meal Plans:</h1>
      </header>

      <article>{currentMealPlan !== undefined ? <CurrentMealPlan /> : <MealPlansList />}</article>
    </section>
  );
};

export default MealPlans;
