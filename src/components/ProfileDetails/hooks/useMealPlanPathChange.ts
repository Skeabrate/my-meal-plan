import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MealPlansContext } from '../context/MealPlansContext';

export const useMealPlanPathChange = () => {
  const [loadingMealPlan, setLoadingMealPlan] = useState(false);
  const { mealPlans, setCurrentMealPlan } = useContext(MealPlansContext);
  const router = useRouter();

  const changeMealPlanPath = (mealPlanId: number) => {
    setLoadingMealPlan(true);
    router.push({
      query: { ...router.query, planId: mealPlanId },
    });
  };

  useEffect(() => {
    const newCurrentMealPlan = mealPlans.find(
      (plan) => plan.id.toString() === router.query?.planId
    );

    newCurrentMealPlan ? setCurrentMealPlan(newCurrentMealPlan) : setCurrentMealPlan(undefined);
    setLoadingMealPlan(false);
  }, [router.query, mealPlans, setCurrentMealPlan]);

  return { loadingMealPlan, changeMealPlanPath };
};
