import axios from 'axios';
import { useQuery } from 'react-query';
import { MealsSectionType } from 'types/pscale/MealPlanType';
import { MealType } from 'types/MealType';

export const fetchMealsFromMealsSections = async (
  mealsSectionsWithoutFetchedMeals: MealsSectionType[]
) => {
  const mealsSections = mealsSectionsWithoutFetchedMeals.map(({ id, mealsSectionName, meals }) => {
    return {
      id,
      mealsSectionName,
      meals: meals.map(({ id, mealId }) => {
        return {
          id,
          mealDetails: axios
            .get(`${process.env.FETCH_MEAL_BY_ID}${mealId}`)
            .then((mealDetails) => mealDetails?.data?.meals[0]),
        } as unknown as { id: string; mealDetails: MealType };
      }),
    };
  });

  for (const mealsSection of mealsSections) {
    for await (const meal of mealsSection.meals) {
      meal.mealDetails = await Promise.resolve(meal.mealDetails);
    }
  }

  return mealsSections;
};

export const useFetchMealsFromMealsSections = (
  mealsSectionsWithoutFetchedMeals: MealsSectionType[]
) => {
  const {
    data: mealsSections,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ['fetchMealPlanMeals', mealsSectionsWithoutFetchedMeals],
    () => fetchMealsFromMealsSections(mealsSectionsWithoutFetchedMeals),
    {
      enabled: !!mealsSectionsWithoutFetchedMeals,
      refetchOnWindowFocus: false,
    }
  );

  return { mealsSections, isLoading, error, refetch };
};
