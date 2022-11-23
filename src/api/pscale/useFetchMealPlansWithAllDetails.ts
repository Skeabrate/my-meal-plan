import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export const useFetchMealPlansWithAllDetails = () => {
  const [mealPlansWithAllDetails, setMealPlansWithAllDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { data } = useSession();

  const fetchMealPlans = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: 'post',
        url: '/api/fetchMealPlansWithAllDetails',
        data: {
          userEmail: data?.user.email,
        },
      });

      setMealPlansWithAllDetails(res.data);
    } catch (err) {
      console.log(err);
      setError(true);
    }
    setIsLoading(false);
  }, [data?.user]);

  useEffect(() => {
    fetchMealPlans();
  }, [fetchMealPlans]);

  return { mealPlansWithAllDetails, isLoading, error };
};
