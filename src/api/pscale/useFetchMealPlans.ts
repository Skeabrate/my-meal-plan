import axios from 'axios';
import { useQuery } from 'react-query';
import Prisma from '@prisma/client';

export const fetchMealPlans = async (userEmail: string): Promise<Prisma.MealPlan[]> => {
  const { data } = await axios({
    method: 'post',
    url: '/api/fetchMealPlans',
    data: {
      userEmail,
    },
  });
  return data;
};

export const useFetchMealPlans = (userEmail: string) => {
  const {
    data: mealPlans,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery('fetchMealPlans', () => fetchMealPlans(userEmail), {
    refetchOnWindowFocus: false,
  });

  return {
    mealPlans,
    isLoading,
    isError,
    error:
      axios.isAxiosError(error) && typeof error.response?.data === 'string' && error.response?.data,
    refetch,
    isRefetching,
  };
};
