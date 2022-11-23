import { useState } from 'react';
import axios from 'axios';

export const useCreateMealsSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const createMealsSection = async ({
    mealPlanId,
    mealsSectionName,
    activeDayId,
    activeDayName,
  }: {
    mealPlanId: string;
    mealsSectionName: string;
    activeDayName: string;
    activeDayId: string | undefined;
  }) => {
    setIsLoading(true);
    try {
      await axios({
        method: 'post',
        url: '/api/createMealsSection',
        data: {
          mealPlanId,
          mealsSectionName,
          activeDayId,
          activeDayName,
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
        setError(err.response?.data);
      }
    }

    setIsLoading(false);
  };

  return {
    createMealsSection,
    isLoading,
    error,
  };
};
