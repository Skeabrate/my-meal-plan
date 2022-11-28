import axios from 'axios';
import { useQuery } from 'react-query';
import { CategoryType } from 'types/CategoryType';

export const fetchCategories = async (): Promise<CategoryType[]> => {
  const {
    data: { categories },
  } = await axios.get(process.env.FETCH_CATEGORIES!);
  return categories;
};

export const useFetchCategories = () => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery('fetchCategories', fetchCategories, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { categories, isLoading, isError, error: axios.isAxiosError(error) ? error.message : '' };
};
