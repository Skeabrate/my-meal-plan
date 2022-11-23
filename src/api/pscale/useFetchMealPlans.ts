import axios from 'axios';
import { useQuery } from 'react-query';

export const fetchMealPlans = async (userEmail: string) => {
  try {
    const res = await axios.get(`/api/fetchMealPlans?userEmail=${userEmail}`);

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
