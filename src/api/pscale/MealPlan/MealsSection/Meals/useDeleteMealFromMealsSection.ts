import { useState } from 'react';
import axios from 'axios';

export const useDeleteMealFromMealsSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const deleteMealFromMealsSection = async (mealId: string) => {
    setIsLoading(true);
    try {
      await axios.get(`/api/deleteMealFromMealsSection?mealId=${mealId}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.message);
        setError(err.message);
      }
    }
    setIsLoading(false);
  };

  return {
    deleteMealFromMealsSection,
    isLoading,
    error,
  };
};
