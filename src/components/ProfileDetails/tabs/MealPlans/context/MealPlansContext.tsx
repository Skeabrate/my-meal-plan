import React, { useCallback, useMemo, useState } from 'react';

export type MealPlan = {
  id: number;
  name: string;
};

const dbData: MealPlan[] = [
  { id: 0, name: 'First meal plan' },
  { id: 1, name: 'Second meal plan' },
  { id: 2, name: 'Third meal plan' },
];

type MealPlansContextType = {
  mealPlans: MealPlan[];
  setMealPlans: React.Dispatch<React.SetStateAction<MealPlan[]>>;
  currentMealPlan: undefined | MealPlan;
  setCurrentMealPlan: React.Dispatch<React.SetStateAction<undefined | MealPlan>>;
  deleteMealPlan: (mealPlanId: number) => void;
};

export const MealPlansContext = React.createContext({} as MealPlansContextType);

export default function MealPlansProvider({ children }: { children: React.ReactNode }) {
  const [mealPlans, setMealPlans] = useState(dbData);
  const [currentMealPlan, setCurrentMealPlan] = useState<undefined | MealPlan>(undefined);

  const deleteMealPlan = useCallback(
    (mealPlanId: number) => {
      if (confirm('Do you want to delete this meal plan?')) {
        setMealPlans((currentMealPlans) => currentMealPlans.filter((i) => i.id !== mealPlanId));
      }
    },
    [setMealPlans]
  );

  const value = useMemo(
    () => ({
      mealPlans,
      setMealPlans,
      currentMealPlan,
      setCurrentMealPlan,
      deleteMealPlan,
    }),
    [mealPlans, setMealPlans, currentMealPlan, setCurrentMealPlan, deleteMealPlan]
  );

  return <MealPlansContext.Provider value={value}>{children}</MealPlansContext.Provider>;
}
