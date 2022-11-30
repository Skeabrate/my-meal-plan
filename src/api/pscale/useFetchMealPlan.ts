import axios from 'axios';
import { useQuery } from 'react-query';
import Prisma from '@prisma/client';
import { useSession } from 'next-auth/react';

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
  const { data } = useSession();

  const {
    data: mealPlan,
    isLoading,
    isError,
    error,
  } = useQuery(['fetchMealPlan', mealPlanName], () => fetchMealPlan(data?.user.id, mealPlanName), {
    refetchOnWindowFocus: false,
  });

  return {
    mealPlan,
    isLoading,
    isError,
    error: axios.isAxiosError(error) && error.response?.data,
  };
};
