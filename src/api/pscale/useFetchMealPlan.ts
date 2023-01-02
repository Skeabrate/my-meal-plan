import axios from 'axios';
import { useQuery } from 'react-query';
import Prisma from '@prisma/client';
import { useSessionHelper } from 'hooks/useSessionHelper';

export const fetchMealPlan = async (
  userId: string | undefined,
  mealPlanName: string
): Promise<Prisma.MealPlan> => {
  const { data } = await axios({
    method: 'post',
    url: '/api/fetchMealPlan',
    data: {
      userId,
      mealPlanName,
    },
  });
  return data;
};

export const useFetchMealPlan = (mealPlanName: string) => {
  const { data } = useSessionHelper();

  const {
    data: mealPlan,
    isLoading,
    isRefetching,
    isError,
    error,
  } = useQuery(['fetchMealPlan', mealPlanName], () => fetchMealPlan(data?.user.id, mealPlanName), {
    refetchOnWindowFocus: false,
  });

  return {
    mealPlan,
    isLoading,
    isRefetching,
    isError,
    error: axios.isAxiosError(error) && error.response?.data,
  };
};
