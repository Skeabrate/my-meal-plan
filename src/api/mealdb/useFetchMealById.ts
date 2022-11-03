import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiResponseType } from 'types/ApiResponseType';
import { MealType } from 'types/MealType';

export const fetchMealById = async (mealId: string) => {
  try {
    const res = await axios.get(`${process.env.FETCH_MEAL_BY_ID}${mealId}`);

    return res?.data?.meals;
  } catch (err) {
    console.log(axios.isAxiosError(err) && err.message);
    throw new Error('Something went wrong');
  }
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