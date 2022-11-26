import Prisma from '@prisma/client';
import axios from 'axios';
import { useQuery } from 'react-query';

export const fetchMealsSections = async (
  mealPlanId: string | undefined,
  dayName: string
): Promise<Prisma.MealsSection[]> => {
  if (mealPlanId && dayName) {
    const { data } = await axios({
      method: 'post',
      url: '/api/fetchMealsSections',
      data: {
        mealPlanId,
        dayName,
      },
    });

    return data;
  } else {
    return [];
  }
};

export const useFetchMealsSections = (mealPlanId: string | undefined, dayName: string) => {
  const {
    data: mealsSections,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery(
    ['fetchMealsSections', dayName || mealPlanId],
    () => fetchMealsSections(mealPlanId, dayName),
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    mealsSections,
    isLoading,
    isError,
    error:
      axios.isAxiosError(error) && typeof error.response?.data === 'string' && error.response?.data,
    refetch,
    isRefetching,
  };
};
