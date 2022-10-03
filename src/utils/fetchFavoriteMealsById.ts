import axios from 'axios';
import { MealType } from 'types/MealType';

export const fetchFavoriteMealsById = async (meals: string[] = []) => {
  const mealsById = meals.map((meal) =>
    axios
      .get(`${process.env.FETCH_MEAL_BY_ID}${meal}`)
      .then((mealDetails) => mealDetails?.data?.meals[0])
      .catch((err) => err)
  );

  return (await Promise.all(mealsById)) as MealType[];
};
