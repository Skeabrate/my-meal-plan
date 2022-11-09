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
  currentMealPlan: undefined | MealPlan;
  setCurrentMealPlan: React.Dispatch<React.SetStateAction<undefined | MealPlan>>;
  addNewMealPlan: (inputValue: string) => void;
  addNewMealSection: (inputValue: string, activeDay: string) => void;
  addMealToMealsSection: () => void;
  deleteMealPlan: (mealPlanId: number) => void;
  deleteMealsSection: (mealSectionName: string, activeDay: string) => void;
  deleteMealFromMealsSection: (
    mealSectionId: number,
    mealToDeleteId: string,
    activeDay: string
  ) => void;
};

export const MealPlansContext = React.createContext({} as MealPlansContextType);

export default function MealPlansProvider({ children }: { children: React.ReactNode }) {
  const [mealPlans, setMealPlans] = useState(dbData);
  const [currentMealPlan, setCurrentMealPlan] = useState<undefined | MealPlan>(undefined);

  const addNewMealPlan = useCallback((inputValue: string) => {
    if (inputValue) {
      const newMealPlan = {
        id: 3,
        name: inputValue,
        days: {
          mon: [],
          tue: [],
          wed: [],
          thu: [],
          fri: [],
          sat: [],
          sun: [],
        },
      };

      setMealPlans((dbMealPlans) => [...dbMealPlans, newMealPlan]);
    }
  }, []);

  const addNewMealSection = useCallback(
    (inputValue: string, activeDay: string) => {
      setMealPlans((plans) => {
        return plans.map((plan) => {
          if (plan.id === currentMealPlan?.id) {
            plan.days[activeDay as keyof typeof plan.days].push({
              id: 123,
              mealPlan: inputValue,
              meals: [],
            });
          }
          return plan;
        });
      });
    },
    [currentMealPlan]
  );

  const addMealToMealsSection = useCallback(() => {}, []);

  const deleteMealPlan = useCallback(
    (mealPlanId: number) => {
      if (confirm('Do you want to delete this meal plan?')) {
        setMealPlans((currentMealPlans) => currentMealPlans.filter((i) => i.id !== mealPlanId));
        setCurrentMealPlan(undefined);
      }
    },
    [setMealPlans]
  );

  const deleteMealsSection = useCallback(
    (mealSectionName: string, activeDay: string) => {
      setMealPlans((plans) => {
        return plans.map((plan) => {
          if (plan.id === currentMealPlan?.id) {
            plan.days[activeDay as keyof typeof plan.days] = plan.days[
              activeDay as keyof typeof plan.days
            ].filter((p) => p.mealPlan !== mealSectionName);
          }

          return plan;
        });
      });
    },
    [currentMealPlan]
  );

  const deleteMealFromMealsSection = useCallback(
    (mealSectionId: number, mealToDeleteId: string, activeDay: string) => {
      setMealPlans((plans) => {
        return plans.map((plan) => {
          if (plan.id === currentMealPlan?.id) {
            const mealPlanToChange = plan.days[activeDay as keyof typeof plan.days].find(
              (p) => p.id === mealSectionId
            );
            mealPlanToChange!.meals = mealPlanToChange!.meals.filter((id) => id !== mealToDeleteId);
          }
          return plan;
        });
      });
    },
    [currentMealPlan]
  );

  const value = useMemo(
    () => ({
      mealPlans,
      currentMealPlan,
      setCurrentMealPlan,
      addNewMealPlan,
      addNewMealSection,
      addMealToMealsSection,
      deleteMealPlan,
      deleteMealsSection,
      deleteMealFromMealsSection,
    }),
    [
      mealPlans,
      currentMealPlan,
      setCurrentMealPlan,
      addNewMealPlan,
      addNewMealSection,
      addMealToMealsSection,
      deleteMealPlan,
      deleteMealsSection,
      deleteMealFromMealsSection,
    ]
  );

  return <MealPlansContext.Provider value={value}>{children}</MealPlansContext.Provider>;
}
