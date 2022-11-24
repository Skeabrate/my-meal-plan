import axios from 'axios';
import { useQuery } from 'react-query';
import { MealType } from 'types/MealType';
import { ApiResponseType } from 'types/ApiResponseType';

export const fetchSearchResuts = async (inputValue: string) => {
  const {
    data: { meals: searchResults },
  } = await axios.get(`${process.env.FETCH_MEAL_BY_NAME}${inputValue}`);
  return searchResults ?? [];
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
