import { useState } from 'react';
import axios from 'axios';

export const useDeleteMealsSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const deleteMealsSection = async (dayId: string, mealsSectionId: string) => {
    setIsLoading(true);
    try {
      await axios({
        method: 'post',
        url: '/api/deleteMealsSection',
        data: {
          dayId,
          mealsSectionId,
        },
      });
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
