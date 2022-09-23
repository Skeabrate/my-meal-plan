import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiResponseType } from 'types/ApiResponseType';
import { MealType } from 'types/MealType';

export const fetchMealById = async (mealId: string) => {
  try {
    const res = await axios.get(`${process.env.FETCH_MEAL_BY_ID}${mealId}`);

    return res?.data?.meals;
  } catch (err) {
    throw new Error('Something went wrong');
  }
};

export const useFetchMealById = (mealId: string) => {
  const { data, isLoading, error } = useQuery('mealById', () => fetchMealById(mealId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error } as { data: MealType[] } & ApiResponseType;
};
