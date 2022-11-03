import React from 'react';
import { MealPlan } from '../MealPlans';

const CurrentMealPlan = ({
  currentMealPlan,
  setCurrentMealPlan,
}: {
  currentMealPlan: MealPlan;
  setCurrentMealPlan: React.Dispatch<React.SetStateAction<MealPlan | undefined>>;
}) => {
  return (
    <>
      <button onClick={() => setCurrentMealPlan(undefined)}>Go back to Meal Plans list</button>
      <h3>{currentMealPlan.name}</h3>
    </>
  );
};

export default CurrentMealPlan;
