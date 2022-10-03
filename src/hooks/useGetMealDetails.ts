import { useMemo } from 'react';
import { MealType } from 'types/MealType';

export const useGetMealDetails = (mealDetails: MealType) => {
  const getIngredients = useMemo(
    () =>
      Object.entries(mealDetails).reduce((acc, [key, value]) => {
        if (key.includes('strIngredient') && value?.trim()) {
          acc.push({ id: +key.split('strIngredient')[1], firstValue: value, secondValue: '' });
        }
        if (key.includes('strMeasure') && value?.trim()) {
          const index = +key.split('strMeasure')[1];
          acc[index - 1].secondValue = value;
        }

        return acc;
      }, [] as { id: number; firstValue: string; secondValue: string }[]),
    [mealDetails]
  );

  const getInstruction = useMemo(
    () =>
      mealDetails.strInstructions
        .split('.')
        .filter((item) => item)
        .map((item, index) => ({
          id: index,
          firstValue: `Step ${index + 1}:`,
          secondValue: item,
        })),
    [mealDetails]
  );

  return {
    id: mealDetails.idMeal,
    name: mealDetails.strMeal,
    category: mealDetails.strCategory,
    area: mealDetails.strArea,
    imgUrl: mealDetails.strMealThumb,
    youtubeUrl: mealDetails.strYoutube.slice(32),
    instructions: getInstruction,
    ingredients: getIngredients,
  };
};
