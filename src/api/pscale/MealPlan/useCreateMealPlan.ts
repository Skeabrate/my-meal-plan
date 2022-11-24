import { useState } from 'react';
import axios from 'axios';

export const useCreateMealPlan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const createMealPlan = async (userEmail: string, mealPlanName: string) => {
    setIsLoading(true);

    try {
      await axios({
        method: 'post',
        url: '/api/createMealPlan',
        data: {
          userEmail,
          mealPlanName,
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        setError(err);
      }
    }

    setIsLoading(false);
  };

  return {
    createMealPlan,
    isLoading,
    error,
  };
};