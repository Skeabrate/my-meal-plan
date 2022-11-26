import axios from 'axios';
import { useQuery } from 'react-query';
import { MealType } from 'types/MealType';

export const fetchSearchResuts = async (inputValue: string): Promise<MealType[]> => {
  const {
    data: { meals: searchResults },
  } = await axios.get(`${process.env.FETCH_MEAL_BY_NAME}${inputValue}`);
  return searchResults ?? [];
};

export const useFetchSearchResults = (inputValue: string) => {
  const {
    data: searchResults = null,
    isLoading,
    isError,
    error,
  } = useQuery(['fetchSearchResults', inputValue], () => fetchSearchResuts(inputValue), {
    enabled: !!inputValue,
    refetchOnWindowFocus: false,
  });

  return { searchResults, isLoading, isError, error: axios.isAxiosError(error) && error.message };
};
