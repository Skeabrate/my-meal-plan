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
    activeDayId: string;
    activeDayName: string;
  }) => {
    setIsLoading(true);

    try {
      await axios.get(
        `/api/createMealsSection?mealPlanId=${mealPlanId}&mealsSectionName=${mealsSectionName}&activeDayId=${activeDayId}&activeDayName=${activeDayName}`
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
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
