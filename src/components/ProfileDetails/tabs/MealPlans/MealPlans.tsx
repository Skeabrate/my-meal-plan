import { useContext } from 'react';
import MealPlansProvider, { MealPlansContext } from '../../context/MealPlansContext';
import CurrentMealPlan from './CurrentMealPlan/CurrentMealPlan';
import MealPlansList from './MealPlansList/MealPlansList';

const DisplayPlans = () => {
  const { currentMealPlan } = useContext(MealPlansContext);
  return currentMealPlan !== undefined ? <CurrentMealPlan /> : <MealPlansList />;
};

const MealPlans = () => {
  return (
    <section>
      <header>
        <h1>My Meal Plans:</h1>
      </header>

      <article>
        <MealPlansProvider>
          <DisplayPlans />
        </MealPlansProvider>
      </article>
    </section>
  );
};

export default MealPlans;
