import { useContext, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './SearchBar.styles';
import CloseSvg from 'assets/SVG/Close.svg';
import { SearchBarContext } from 'context/SearchBarContext';
import { debounce } from 'utils/debounce';
import { useSearchResults } from 'hooks/useSearchResults';

const SearchBar = () => {
  const { searchResults, error, getSearchResults } = useSearchResults();
  const { isSearchBarOpen, toggleSearchBar } = useContext(SearchBarContext);

  const debouncedResults = useMemo(() => debounce(getSearchResults, 700), [getSearchResults]);

  const emptySearchInput = searchResults === null;
  const noMatchingResults = !emptySearchInput && searchResults.length === 0;
  const matchingResults = !emptySearchInput && searchResults.length > 0;

  return (
    <Styled.SearchBar $isSearchBarOpen={isSearchBarOpen}>
      <Styled.Background
        role='button'
        aria-label='close search bar'
        onClick={toggleSearchBar}
      />

      <Styled.SearchBarInner>
        <Styled.InputWrapper>
          <input
            type='text'
            placeholder='Search...'
            autoFocus
            onChange={debouncedResults}
          />
          <button onClick={toggleSearchBar}>
            <CloseSvg />
          </button>
        </Styled.InputWrapper>

        <Styled.Results>
          {error && <p>An error occured while fetching meals.</p>}
          {noMatchingResults && <p>We couldn't find any meals.</p>}
          {matchingResults && (
            <>
              {searchResults.map(({ idMeal, strMeal, strCategory, strArea, strMealThumb }) => (
                <Link
                  href={`/meal/${idMeal}`}
                  key={idMeal}
                >
                  <a>
                    <Styled.FoundItem>
                      <div>
                        <Image
                          src={strMealThumb}
                          alt={strMeal}
                          height={100}
                          width={100}
                          objectFit='contain'
                        />
                      </div>

                      <ul>
                        <li>{strMeal}</li>
                        <li>{strCategory}</li>
                        <li>{strArea}</li>
                      </ul>
                    </Styled.FoundItem>
                  </a>
                </Link>
              ))}
            </>
          )}
        </Styled.Results>
      </Styled.SearchBarInner>
    </Styled.SearchBar>
  );
};

export default SearchBar;
