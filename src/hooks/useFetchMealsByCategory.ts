import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiResponseType } from 'types/ApiResponseType';
import { MealByCategoryType } from 'types/MealByCategoryType';

export const fetchMealsByCategory = async (category: string) => {
  try {
    const res = await axios.get(`${process.env.FETCH_MEALS_BY_CATEGORY}${category}`);

    return res?.data?.meals;
  } catch (err) {
    throw new Error('Something went wrong');
  }
};

export const useFetchMealsByCategory = (category: string) => {
  const {
    data: mealsByCategory,
    isLoading,
    error,
  } = useQuery(['fetchMealsByCategory', category], () => fetchMealsByCategory(category), {
    enabled: !!category,
  });

  return { mealsByCategory, isLoading, error } as {
    mealsByCategory: MealByCategoryType[];
  } & ApiResponseType;
};
