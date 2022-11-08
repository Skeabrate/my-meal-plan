import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiResponseType } from 'types/ApiResponseType';
import { MealType } from 'types/MealType';

type MealPlansInCurrentDayType = { id: number; mealPlan: string; meals: string[] };
export type FetchedMealType = { id: number; mealPlan: string; meals: MealType[] };

export const fetchMealPlans = async (mealPlansInCurrentDay: MealPlansInCurrentDayType[]) => {
  const fetchedMeals = mealPlansInCurrentDay.map((mealPlan) => ({
    id: mealPlan.id,
    mealPlan: mealPlan.mealPlan,
    meals: mealPlan.meals.map((mealId) =>
      axios
        .get(`${process.env.FETCH_MEAL_BY_ID}${mealId}`)
        .then((mealDetails) => mealDetails?.data?.meals[0])
        .catch((err) => console.log(axios.isAxiosError(err) && err.message))
    ),
  }));

  for await (const meal of fetchedMeals) {
    meal.meals = await Promise.all(meal.meals);
  }

  return fetchedMeals as any;
};

export const useFetchMealPlans = (mealPlansInCurrentDay: MealPlansInCurrentDayType[]) => {
  const {
    data: fetchedMealPlans,
    isLoading,
    error,
  } = useQuery(
    ['fetchMealPlans', mealPlansInCurrentDay],
    () => fetchMealPlans(mealPlansInCurrentDay),
    {
      enabled: !!mealPlansInCurrentDay,
      refetchOnWindowFocus: false,
    }
  );

  return { fetchedMealPlans, isLoading, error } as {
    fetchedMealPlans: FetchedMealType[];
  } & ApiResponseType;
};
