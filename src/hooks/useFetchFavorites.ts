import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiResponseType } from 'types/ApiResponseType';
import { MealType } from 'types/MealType';

type MealsTableType = string[];

export const fetchFavorites = async (meals: MealsTableType = []) => {
  const mealsById = meals.map((mealId) =>
    axios
      .get(`${process.env.FETCH_MEAL_BY_ID}${mealId}`)
      .then((mealDetails) => mealDetails?.data?.meals[0])
      .catch((err) => err)
  );

  return await Promise.all(mealsById);
};

export const useFetchFavorites = (meals: MealsTableType) => {
  const {
    data: favoritesById,
    isLoading,
    error,
  } = useQuery(['fetchFavorites', meals], () => fetchFavorites(meals), {
    enabled: !!meals,
  });

  return { favoritesById, isLoading, error } as { favoritesById: MealType[] } & ApiResponseType;
};
