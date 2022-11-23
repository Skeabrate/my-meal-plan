import { useState } from 'react';
import axios from 'axios';

export const useDeleteMealPlan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const deleteMealPlan = async (mealPlanId: string) => {
    setIsLoading(true);
    try {
      await axios({
        method: 'post',
        url: '/api/deleteMealPlan',
        data: {
          mealPlanId,
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
    deleteMealPlan,
    isLoading,
    error,
  };
};
