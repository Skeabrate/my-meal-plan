import { useMemo } from 'react';
import { MealType } from 'types/MealType';

export type IngredientType = { id: number; ingredient: string; measure: string };
export type StepType = { id: number; step: string; description: string };

export const useGetMealDetails = (mealDetails: MealType) => {
  const getIngredients = useMemo(
    () =>
      Object.entries(mealDetails).reduce((acc, [key, value]) => {
        if (key.includes('strIngredient') && value?.trim()) {
          acc.push({ id: +key.split('strIngredient')[1], ingredient: value, measure: '' });
        }
        if (key.includes('strMeasure') && value?.trim()) {
          const index = +key.split('strMeasure')[1];
          acc[index - 1].measure = value;
        }

        return acc;
      }, [] as IngredientType[]),
    [mealDetails]
  );

  const getSteps = useMemo(
    () =>
      mealDetails.strInstructions
        .split('.')
        .filter((item) => item && item.trim())
        .map((item, index) => ({
          id: index,
          step: index < 9 ? `0${index + 1}` : `${index + 1}`,
          description: `${item.trim()}.`,
        })) as StepType[],
    [mealDetails]
  );

  const getYoutubeUrl = `https://www.youtube.com/embed/${mealDetails.strYoutube.slice(32)}`;

  return {
    id: mealDetails.idMeal,
    name: mealDetails.strMeal,
    category: mealDetails.strCategory,
    area: mealDetails.strArea,
    imgUrl: mealDetails.strMealThumb,
    youtubeUrl: getYoutubeUrl,
    instructions: mealDetails.strInstructions,
    steps: getSteps,
    ingredients: getIngredients,
  };
};
