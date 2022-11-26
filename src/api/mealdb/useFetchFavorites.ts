import axios from 'axios';
import { useQuery } from 'react-query';
import { MealType } from 'types/MealType';

type MealsTableType = string[];

export const fetchFavorites = async (meals: MealsTableType = []): Promise<MealType[]> => {
  const mealsById = meals.map((mealId) =>
    axios
      .get(`${process.env.FETCH_MEAL_BY_ID}${mealId}`)
      .then((mealDetails) => mealDetails?.data?.meals[0])
      .catch((err) => console.log(axios.isAxiosError(err) && err.message))
  );

  return await Promise.all(mealsById);
};

export const useFetchFavorites = (meals: MealsTableType) => {
  const {
    data: favoritesById,
    isLoading,
    isError,
    error,
  } = useQuery(['fetchFavorites', meals], () => fetchFavorites(meals), {
    enabled: !!meals,
    refetchOnWindowFocus: false,
  });

  return { favoritesById, isLoading, isError, error: axios.isAxiosError(error) && error.message };
};
