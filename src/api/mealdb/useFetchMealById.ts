import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiResponseType } from 'types/ApiResponseType';
import { MealType } from 'types/MealType';

export const fetchMealById = async (mealId: string) => {
  const {
    data: { meals },
  } = await axios.get(`${process.env.FETCH_MEAL_BY_ID}${mealId}`);
  return meals;
};

export const useFetchMealById = (mealId: string) => {
  const {
    data: mealById,
    isLoading,
    error,
  } = useQuery(['fetchMealById', mealId], () => fetchMealById(mealId), {
    enabled: !!mealId,
    refetchOnWindowFocus: false,
  });

  return { mealById, isLoading, error } as { mealById: MealType[] } & ApiResponseType;
};
