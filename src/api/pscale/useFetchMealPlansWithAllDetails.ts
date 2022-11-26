import axios from 'axios';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { MealPlanType } from 'types/MealPlanTypes';

export const fetchMealPlansWithAllDetails = async (userEmail: string): Promise<MealPlanType[]> => {
  const { data } = await axios({
    method: 'post',
    url: '/api/fetchMealPlansWithAllDetails',
    data: {
      userEmail,
    },
  });
  return data;
};

export const useFetchMealPlansWithAllDetails = () => {
  const { data: session } = useSession();

  const {
    data: mealPlansWithAllDetails,
    isLoading,
    isError,
    error,
  } = useQuery(
    'fetchMealPlansWithAllDetails',
    () => fetchMealPlansWithAllDetails(session?.user.email as string),
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    mealPlansWithAllDetails,
    isLoading,
    isError,
    error:
      axios.isAxiosError(error) && typeof error.response?.data === 'string' && error.response?.data,
  };
};
