import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiResponseType } from 'types/ApiResponseType';
import { MealByCategoryType } from 'types/MealByCategoryType';

export const fetchMealsByCategory = async (category: string) => {
  const {
    data: { meals },
  } = await axios.get(`${process.env.FETCH_MEALS_BY_CATEGORY}${category}`);
  return meals;
};

export const useFetchMealsByCategory = (category: string) => {
  const {
    data: mealsByCategory,
    isLoading,
    error,
  } = useQuery(['fetchMealsByCategory', category], () => fetchMealsByCategory(category), {
    enabled: !!category,
    refetchOnWindowFocus: false,
  });

  return { mealsByCategory, isLoading, error } as {
    mealsByCategory: MealByCategoryType[];
  } & ApiResponseType;
};
