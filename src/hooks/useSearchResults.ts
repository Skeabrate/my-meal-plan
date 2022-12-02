import { useDebouncedValue } from 'hooks/useDebouncedValue';
import { useFetchSearchResults } from 'api/mealdb/useFetchSearchResults';

export const useSearchResults = (inputValue: string) => {
  const debouncedInputValue = useDebouncedValue(inputValue, 700);
  const { searchResults, isLoading, isError, error } = useFetchSearchResults(debouncedInputValue);

  const emptySearchInput = searchResults === null;
  const noMatchingResults = !emptySearchInput && searchResults.length === 0;
  const matchingResults = !emptySearchInput && searchResults.length > 0;

  return {
    searchResults,
    isLoading,
    isError,
    error,
    noMatchingResults,
    matchingResults,
  };
};
