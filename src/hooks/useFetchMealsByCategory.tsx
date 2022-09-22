import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiResponseType } from 'types/ApiResponseType';
import { MealByCategoryType } from 'types/MealByCategoryType';

export const fetchMealsByCategory = async (category: string) => {
  try {
    const res = await axios.get(`${process.env.FILTER_BY_CATEGORY}${category}` || '');

    return res?.data?.meals;
  } catch (err) {
    throw new Error('Something went wrong');
  }
};

export const useFetchMealsByCategory = (category: string) => {
  const { data, isLoading, error } = useQuery(
    'mealsByCategory',
    () => fetchMealsByCategory(category),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading, error } as { data: MealByCategoryType[] } & ApiResponseType;
};
