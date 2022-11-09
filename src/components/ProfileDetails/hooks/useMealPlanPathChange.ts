import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MealPlansContext } from 'context/MealPlansContext';

export const useMealPlanPathChange = () => {
  const [loadingMealPlan, setLoadingMealPlan] = useState(false);
  const { mealPlans, setCurrentMealPlan } = useContext(MealPlansContext);

  const router = useRouter();

  const changeMealPlanPath = (mealPlanId: number) => {
    router.push({
      query: { ...router.query, planId: mealPlanId },
    });
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!router.query.planId && !url.includes(`&planId=`)) {
        setCurrentMealPlan(undefined);
        return;
      }
      setLoadingMealPlan(true);
    };

    const handleRouteComplete = (url: string) => {
      const newCurrentMealPlan = mealPlans.find(
        (plan) => plan.id.toString() === url.split('&planId=')[1]
      );

      newCurrentMealPlan ? setCurrentMealPlan(newCurrentMealPlan) : setCurrentMealPlan(undefined);
      setLoadingMealPlan(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteComplete);
    };
  }, [router.events, mealPlans, setCurrentMealPlan, router.query.planId]);

  return { loadingMealPlan, changeMealPlanPath };
};
