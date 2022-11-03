import Link from 'next/link';
import React, { useState } from 'react';
import CurrentMealPlan from './CurrentMealPlan/CurrentMealPlan';
import MealPlansList from './MealPlansList/MealPlansList';

export type MealPlan = {
  id: number;
  name: string;
};

const dbData: MealPlan[] = [
  { id: 0, name: 'First meal plan' },
  { id: 1, name: 'Second meal plan' },
  { id: 2, name: 'Third meal plan' },
];

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState(dbData);
  const [currentMealPlan, setCurrentMealPlan] = useState<undefined | MealPlan>(undefined);

  return (
    <section>
      <header>
        <h1>My Meal Plans:</h1>
      </header>

      <article>
        {currentMealPlan !== undefined ? (
          <CurrentMealPlan
            currentMealPlan={currentMealPlan}
            setCurrentMealPlan={setCurrentMealPlan}
          />
        ) : (
          <MealPlansList
            mealPlans={mealPlans}
            setCurrentMealPlan={setCurrentMealPlan}
            setMealPlans={setMealPlans}
          />
        )}
      </article>
    </section>
  );
};

export default MealPlans;
