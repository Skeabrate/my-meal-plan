import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MealPlansContext } from '../context/MealPlansContext';

export const useMealPlanPathChange = () => {
  const { mealPlans, setCurrentMealPlan } = useContext(MealPlansContext);
  const router = useRouter();

  useEffect(() => {
    const newCurrentMealPlan = mealPlans.find(
      (plan) => plan.id.toString() === router.query?.planId
    );

    newCurrentMealPlan ? setCurrentMealPlan(newCurrentMealPlan) : setCurrentMealPlan(undefined);
  }, [router.query, mealPlans, setCurrentMealPlan]);
};
