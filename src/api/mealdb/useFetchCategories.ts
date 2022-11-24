import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiResponseType } from 'types/ApiResponseType';
import { CategoryType } from 'types/CategoryType';

export const fetchCategories = async () => {
  const {
    data: { categories },
  } = await axios.get(process.env.FETCH_CATEGORIES!);
  return categories;
};

export const useFetchCategories = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery('fetchCategories', fetchCategories, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { categories, isLoading, error } as { categories: CategoryType[] } & ApiResponseType;
};
