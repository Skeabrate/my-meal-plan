import type Prisma from '@prisma/client';

export type MealPlanType = {
  id: Prisma.MealPlan['id'];
  mealPlanName: Prisma.MealPlan['mealPlanName'];
  days: DaysType[];
};

export type DaysType = {
  id: Prisma.Days['id'];
  dayName: Prisma.Days['dayName'];
  mealsSections: MealsSectionType[];
};

export type MealsSectionType = {
  id: Prisma.MealsSection['id'];
  mealsSectionName: Prisma.MealsSection['mealsSectionName'];
  meals: MealType[];
};

export type MealType = {
  id: Prisma.Meal['id'];
  mealId: Prisma.Meal['mealId'];
};
