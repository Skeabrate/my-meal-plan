import React, { useCallback, useMemo, useState } from 'react';

export type DayType = { id: number; mealPlan: string; meals: string[] };

export type MealPlan = {
  id: number;
  name: string;
  days: {
    mon: DayType[];
    tue: DayType[];
    wed: DayType[];
    thu: DayType[];
    fri: DayType[];
    sat: DayType[];
    sun: DayType[];
  };
};

const dbData: MealPlan[] = [
  {
    id: 0,
    name: 'Vegetarian',
    days: {
      mon: [
        { id: 0, mealPlan: 'Breakfast', meals: ['52870', '52785', '52971'] },
        { id: 1, mealPlan: 'Dinner', meals: ['53025', '53012'] },
      ],
      tue: [{ id: 2, mealPlan: 'Breakfast', meals: ['53025', '53012'] }],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    },
  },
  {
    id: 1,
    name: 'Cheat Meal',
    days: {
      mon: [
        { id: 0, mealPlan: 'Cheat Breakfast', meals: ['52990', '52768'] },
        { id: 1, mealPlan: 'Cheat Dinner', meals: ['52853', '52989', '52905'] },
        { id: 2, mealPlan: 'Cheat Supper', meals: ['52854'] },
      ],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    },
  },
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
        setCurrentMealPlan(undefined);
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
