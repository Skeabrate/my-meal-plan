import axios from 'axios';
import { useQuery } from 'react-query';
import { MealType } from 'types/MealType';
import { ApiResponseType } from 'types/ApiResponseType';

export const fetchSearchResuts = async (inputValue: string) => {
  try {
    const searchResults = await axios.get(`${process.env.FETCH_MEAL_BY_NAME}${inputValue}`);
    return searchResults.data.meals ?? [];
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong');
  }
};

export const useFetchSearchResults = (inputValue: string) => {
  const {
    data: searchResults = null,
    isLoading,
    error,
  } = useQuery(['fetchSearchResults', inputValue], () => fetchSearchResuts(inputValue), {
    enabled: !!inputValue,
    refetchOnWindowFocus: false,
  });

  return { searchResults, isLoading, error } as {
    searchResults: MealType[] | null;
  } & ApiResponseType;
};
