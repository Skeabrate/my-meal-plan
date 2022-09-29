import { useState } from 'react';
import axios from 'axios';
import { MealType } from 'types/MealType';

export const useSearchResults = () => {
  const [searchResults, setSearchResults] = useState<MealType[] | null>(null);
  const [error, setError] = useState<any>(null);

  const getSearchResults = async (e: any) => {
    if (e.target.value) {
      try {
        const res = await axios.get(`${process.env.FETCH_MEAL_BY_NAME}${e.target.value}`);
        setSearchResults(res.data.meals || []);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    } else {
      setSearchResults(null);
    }
  };

  return { searchResults, setSearchResults, error, setError, getSearchResults };
};
