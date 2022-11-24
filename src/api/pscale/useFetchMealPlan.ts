import axios from 'axios';
import { useQuery } from 'react-query';
import { MealPlanType } from 'types/MealPlanTypes';

export const fetchMealPlan = async (
  userEmail: string,
  mealPlanName: string
): Promise<MealPlanType> => {
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
    refetch,
  } = useQuery('fetchMealPlan', () => fetchMealPlan(userEmail, mealPlanName), {
    refetchOnWindowFocus: false,
  });

  return {
    mealPlan,
    isLoading,
    isError,
    error:
      axios.isAxiosError(error) && typeof error.response?.data === 'string' && error.response?.data,
    refetch,
  };
};
