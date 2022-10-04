import { useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './SearchBar.styles';
import CloseSvg from 'assets/SVG/Close.svg';
import { SearchBarContext } from 'context/SearchBarContext';
import { ResizeWindowContext } from 'context/ResizeWindowContext';
import { useFetchSearchResults } from 'api/useFetchSearchResults';
import useDebouncedValue from 'hooks/useDebouncedValue';
import Loading from 'components/Loading/Loading';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');

  const debouncedResults = useDebouncedValue(inputValue, 700);
  const { searchResults, isLoading, error } = useFetchSearchResults(debouncedResults);

  const { isSearchBarOpen, toggleSearchBar } = useContext(SearchBarContext);
  const { windowHeight } = useContext(ResizeWindowContext);

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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type='text'
            placeholder='Search...'
            autoFocus
          />
          <button onClick={toggleSearchBar}>
            <CloseSvg />
          </button>
        </Styled.InputWrapper>

        <Styled.Results $windowHeight={windowHeight}>
          {isLoading && <Loading />}
          {error?.message && <p>An error occured while fetching meals.</p>}
          {noMatchingResults && <p>We couldn't find any meals.</p>}
          {matchingResults && (
            <div>
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
            </div>
          )}
        </Styled.Results>
      </Styled.SearchBarInner>
    </Styled.SearchBar>
  );
};

export default SearchBar;
