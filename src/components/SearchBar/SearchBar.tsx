import { useContext, useEffect, useMemo, useState } from 'react';
import * as Styled from './SearchBar.styles';
import { SearchBarContext } from 'context/SearchBarContext';
import axios from 'axios';
import { debounce } from 'utils/debounce';
import { MealType } from 'types/MealType';

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState<MealType[] | null>(null);
  const [error, setError] = useState<any>(null);

  const { isSearchBarOpen, toggleSearchBar } = useContext(SearchBarContext);

  const handleInputValue = async (e: any) => {
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

  const debouncedResults = useMemo(() => debounce(handleInputValue, 700), []);

  const emptySearchInput = searchResults === null;
  const noMatchingResults = error || (!emptySearchInput && searchResults.length === 0);
  const matchingResults = !emptySearchInput && searchResults.length > 0;

  return isSearchBarOpen ? (
    <Styled.SearchBar>
      <Styled.Background />

      <Styled.InputWrapper>
        <input
          type='text'
          autoFocus
          onChange={debouncedResults}
        />

        <button onClick={toggleSearchBar}>close</button>
      </Styled.InputWrapper>

      <Styled.Results>
        {noMatchingResults && <p>We couldn't find any meals.</p>}
        {matchingResults && (
          <div>
            {searchResults.map(({ idMeal, strMeal }) => (
              <p key={idMeal}>{strMeal}</p>
            ))}
          </div>
        )}
      </Styled.Results>
    </Styled.SearchBar>
  ) : null;
};

export default SearchBar;
