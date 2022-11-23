import { useState } from 'react';
import axios from 'axios';

export const useDeleteMealsSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const deleteMealsSection = async (daysId: string, mealsSectionId: string) => {
    setIsLoading(true);
    try {
      await axios.get(`/api/deleteMealsSection?daysId=${daysId}&mealsSectionId=${mealsSectionId}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.message);
        setError(err.message);
      }
    }
    setIsLoading(false);
  };

  return {
    deleteMealsSection,
    isLoading,
    error,
  };
};
