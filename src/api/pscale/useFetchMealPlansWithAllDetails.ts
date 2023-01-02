import axios from 'axios';
import { useQuery } from 'react-query';
import { MealPlanType } from 'types/MealPlanTypes';
import { useSessionHelper } from 'hooks/useSessionHelper';

export const fetchMealPlansWithAllDetails = async (userId: string): Promise<MealPlanType[]> => {
  const { data } = await axios({
    method: 'post',
    url: '/api/fetchMealPlansWithAllDetails',
    data: {
      userId,
    },
  });
  return data;
};

export const useFetchMealPlansWithAllDetails = () => {
  const { data: session } = useSessionHelper();

  const {
    data: mealPlansWithAllDetails,
    isLoading,
    isRefetching,
    isError,
    error,
  } = useQuery(
    'fetchMealPlansWithAllDetails',
    () => fetchMealPlansWithAllDetails(session?.user.id as string),
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    mealPlansWithAllDetails,
    isLoading,
    isRefetching,
    isError,
    error: axios.isAxiosError(error) && error.response?.data,
  };
};
