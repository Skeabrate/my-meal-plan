import Prisma from '@prisma/client';
import axios from 'axios';
import { useQuery } from 'react-query';

export const fetchMealsFromMealsSection = async (
  mealsSectionId: string
): Promise<Prisma.Meal[]> => {
  const { data } = await axios({
    method: 'post',
    url: '/api/fetchMealsFromMealsSection',
    data: {
      mealsSectionId,
    },
  });
  return data;
};

export const useFetchMealsFromMealsSection = (mealsSectionId: string) => {
  const {
    data: meals,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery(
    ['fetchMealsFromMealsSection', mealsSectionId],
    () => fetchMealsFromMealsSection(mealsSectionId),
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    meals,
    isLoading,
    isError,
    error:
      axios.isAxiosError(error) && typeof error.response?.data === 'string' && error.response?.data,
    refetch,
    isRefetching,
  };
};
