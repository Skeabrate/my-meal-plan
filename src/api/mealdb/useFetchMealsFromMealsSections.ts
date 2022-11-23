import axios from 'axios';
import { useQuery } from 'react-query';

export const fetchMealsFromMealsSections = async (mealsSectionsWithoutFetchedMeals) => {
  const mealsSections = mealsSectionsWithoutFetchedMeals.map(({ id, mealsSectionName, meals }) => {
    return {
      id,
      mealsSectionName,
      meals: meals.map(({ id, mealId }) => {
        return {
          id,
          mealDetails: axios
            .get(`${process.env.FETCH_MEAL_BY_ID}${mealId}`)
            .then((mealDetails) => mealDetails?.data?.meals[0])
            .catch((err) => console.log(axios.isAxiosError(err) && err.message)),
        };
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

export const useFetchMealsFromMealsSections = (mealsSectionsWithoutFetchedMeals) => {
  const {
    data: mealsSections,
    isLoading,
    error,
  } = useQuery(
    ['fetchMealPlanMeals', mealsSectionsWithoutFetchedMeals],
    () => fetchMealsFromMealsSections(mealsSectionsWithoutFetchedMeals),
    {
      enabled: !!mealsSectionsWithoutFetchedMeals,
      refetchOnWindowFocus: false,
    }
  );

  return { mealsSections, isLoading, error };
};
