import axios from 'axios';
import { useQuery } from 'react-query';
import Prisma from '@prisma/client';

export const fetchMealPlan = async (
  userEmail: string,
  mealPlanName: string
): Promise<Prisma.MealPlan & { days: Prisma.Day[] }> => {
  const { data } = await axios({
    method: 'post',
    url: '/api/fetchMealPlan',
    data: {
      userEmail,
      mealPlanName,
    },
  });
  return data;
};

export const useFetchMealPlan = (userEmail: string, mealPlanName: string) => {
  const {
    data: mealPlan,
    isLoading,
    isError,
    error,
  } = useQuery(['fetchMealPlan', mealPlanName], () => fetchMealPlan(userEmail, mealPlanName), {
    refetchOnWindowFocus: false,
  });

  return {
    mealPlan,
    isLoading,
    isError,
    error:
      axios.isAxiosError(error) && typeof error.response?.data === 'string' && error.response?.data,
  };
};
