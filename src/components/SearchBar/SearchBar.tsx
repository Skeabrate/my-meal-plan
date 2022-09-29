import { useCallback, useContext, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './SearchBar.styles';
import CloseSvg from 'assets/SVG/Close.svg';
import { SearchBarContext } from 'context/SearchBarContext';
import { debounce } from 'utils/debounce';
import { useSearchResults } from 'hooks/useSearchResults';
import { usePathChange } from 'hooks/usePathChange';

const SearchBar = () => {
  const { searchResults, setSearchResults, error, getSearchResults } = useSearchResults();
  const { isSearchBarOpen, toggleSearchBar } = useContext(SearchBarContext);

  const debouncedResults = useMemo(() => debounce(getSearchResults, 700), [getSearchResults]);

  const handleCloseSearchBar = useCallback(() => {
    setSearchResults(null);
    toggleSearchBar();
  }, [setSearchResults, toggleSearchBar]);

  usePathChange(isSearchBarOpen ? handleCloseSearchBar : () => {});

  const emptySearchInput = searchResults === null;
  const noMatchingResults = error || (!emptySearchInput && searchResults.length === 0);
  const matchingResults = !emptySearchInput && searchResults.length > 0;

  return isSearchBarOpen ? (
    <Styled.SearchBar $isSearchBarOpen={isSearchBarOpen}>
      <Styled.Background
        role='button'
        aria-label='close search bar'
        onClick={handleCloseSearchBar}
      />

      <Styled.SearchBarInner>
        <Styled.InputWrapper>
          <input
            type='text'
            placeholder='Search...'
            autoFocus
            onChange={debouncedResults}
          />
          <button onClick={handleCloseSearchBar}>
            <CloseSvg />
          </button>
        </Styled.InputWrapper>

        <Styled.Results>
          {noMatchingResults && <p>We couldn't find any meals.</p>}
          {matchingResults && (
            <>
              {searchResults.map(({ idMeal, strMeal, strCategory, strArea, strMealThumb }) => (
                <Link
                  href={`/meal/${idMeal}`}
                  key={idMeal}
                >
                  <a>
                    <div>
                      <Image
                        src={strMealThumb}
                        alt={strMeal}
                        height={100}
                        width={100}
                        object-fit='cover'
                      />

                      <ul>
                        <li>{strMeal}</li>
                        <li>{strCategory}</li>
                        <li>{strArea}</li>
                      </ul>
                    </div>
                  </a>
                </Link>
              ))}
            </>
          )}
        </Styled.Results>
      </Styled.SearchBarInner>
    </Styled.SearchBar>
  ) : null;
};

export default SearchBar;
