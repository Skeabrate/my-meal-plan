import type Prisma from '@prisma/client';

export type MealPlanType = {
  id: Prisma.MealPlan['id'];
  mealPlanName: Prisma.MealPlan['mealPlanName'];
  days: {
    id: Prisma.Days['id'];
    dayName: Prisma.Days['dayName'];
    mealsSections: {
      id: Prisma.MealsSection['id'];
      mealsSectionName: Prisma.MealsSection['mealsSectionName'];
      meals: {
        id: Prisma.Meal['id'];
        mealId: Prisma.Meal['mealId'];
      }[];
    }[];
  }[];
};
