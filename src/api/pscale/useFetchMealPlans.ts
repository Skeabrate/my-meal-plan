import axios from 'axios';
import { useQuery } from 'react-query';
import Prisma from '@prisma/client';

export const fetchMealPlans = async (userEmail: string): Promise<Prisma.MealPlan[]> => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/fetchMealPlans',
      data: {
        userEmail,
      },
    });

    return res.data;
  } catch (err) {
    console.log(axios.isAxiosError(err) && err.message);
    throw new Error('Something went wrong');
  }
};

export const useFetchMealPlans = (userEmail: string) => {
  const {
    data: mealPlans,
    isLoading,
    error,
    refetch,
  } = useQuery(['fetchMealById', userEmail], () => fetchMealPlans(userEmail), {
    enabled: !!userEmail,
    refetchOnWindowFocus: false,
  });

  return { mealPlans, isLoading, error, refetch };
};
