import axios from 'axios';
import { useQuery } from 'react-query';
import { MealByCategoryType } from 'types/MealByCategoryType';

export const fetchMealsByCategory = async (category: string): Promise<MealByCategoryType[]> => {
  const {
    data: { meals },
  } = await axios.get(`${process.env.FETCH_MEALS_BY_CATEGORY}${category}`);
  return meals;
};

export const useFetchMealsByCategory = (category: string) => {
  const {
    data: mealsByCategory,
    isLoading,
    isError,
    error,
  } = useQuery(['fetchMealsByCategory', category], () => fetchMealsByCategory(category), {
    enabled: !!category,
    refetchOnWindowFocus: false,
  });

  return {
    mealsByCategory,
    isLoading,
    isError,
    error: axios.isAxiosError(error) ? error.message : '',
  };
};
