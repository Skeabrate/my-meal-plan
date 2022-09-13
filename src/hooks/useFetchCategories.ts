import axios from "axios";
import { useQuery } from "react-query";
import { Category } from "types/Category";

export const fetchCategories = async () => {
	try{
		const res = await axios.get(process.env.FETCH_CATEGORIES || '')

		return res?.data?.categories
	} catch(err) {
		throw new Error('Something went wrong')
	}
};

export const useFetchCategories = () => {
	const { data, isLoading, error } = useQuery('categories', fetchCategories, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

	return {data, isLoading, error} as { data: Category[], isLoading: boolean, error: unknown}
};
