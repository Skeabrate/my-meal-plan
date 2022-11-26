import axios from 'axios';
import { useQuery } from 'react-query';
import { MealType } from 'types/MealType';

export const fetchMealById = async (mealId: string): Promise<MealType[]> => {
  const {
    data: { meals },
  } = await axios.get(`${process.env.FETCH_MEAL_BY_ID}${mealId}`);
  return meals;
};

export const useFetchMealById = (mealId: string) => {
  const {
    data: mealById,
    isLoading,
    isError,
    error,
  } = useQuery(['fetchMealById', mealId], () => fetchMealById(mealId), {
    enabled: !!mealId,
    refetchOnWindowFocus: false,
  });

  return { mealById, isLoading, isError, error: axios.isAxiosError(error) && error.message };
};
