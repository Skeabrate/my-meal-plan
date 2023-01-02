import axios from 'axios';
import { useQuery } from 'react-query';
import Prisma from '@prisma/client';
import { useSessionHelper } from 'hooks/useSessionHelper';

export const fetchMealPlans = async (userId: string | undefined): Promise<Prisma.MealPlan[]> => {
  const { data } = await axios({
    method: 'post',
    url: '/api/fetchMealPlans',
    data: {
      userId,
    },
  });
  return data;
};

export const useFetchMealPlans = () => {
  const { data } = useSessionHelper();

  const {
    data: mealPlans,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery('fetchMealPlans', () => fetchMealPlans(data?.user.id), {
    refetchOnWindowFocus: false,
  });

  return {
    mealPlans,
    isLoading,
    isError,
    error: axios.isAxiosError(error) && error.response?.data,
    refetch,
    isRefetching,
  };
};
