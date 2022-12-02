import { useState } from 'react';
import * as Styled from '../AddingMealModal.styles';
import ErrorBoundary from 'templates/ErrorBoundary';
import AddingMealsGrid from '../AddingMealsGrid/AddingMealsGrid';
import { useSearchResults } from 'hooks/useSearchResults';

const AddMealFromSearch = ({
  createMealInMealsSectionHandler,
}: {
  createMealInMealsSectionHandler: (body: {}) => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const { searchResults, isLoading, isError, error, noMatchingResults, matchingResults } =
    useSearchResults(inputValue);

  return (
    <>
      <Styled.SearchBar>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type='text'
          placeholder='Search...'
          autoFocus
        />
      </Styled.SearchBar>

      <ErrorBoundary
        isLoading={isLoading}
        loadingHeight={50}
        isError={isError}
        error={error}
      >
        {matchingResults && searchResults && (
          <AddingMealsGrid
            meals={searchResults}
            createMealInMealsSectionHandler={createMealInMealsSectionHandler}
          />
        )}
        {noMatchingResults && <p>Meal not found.</p>}
      </ErrorBoundary>
    </>
  );
};

export default AddMealFromSearch;
