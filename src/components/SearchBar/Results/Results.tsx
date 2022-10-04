import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './Results.styles';
import { useFetchSearchResults } from 'api/useFetchSearchResults';
import { ResizeWindowContext } from 'context/ResizeWindowContext';
import useDebouncedValue from 'hooks/useDebouncedValue';
import Loading from 'components/Loading/Loading';

const Results = ({ inputValue }: { inputValue: string }) => {
  const debouncedInputValue = useDebouncedValue(inputValue, 700);

  const { searchResults, isLoading, error } = useFetchSearchResults(debouncedInputValue);
  const { windowHeight } = useContext(ResizeWindowContext);

  const emptySearchInput = searchResults === null;
  const noMatchingResults = !emptySearchInput && searchResults.length === 0;
  const matchingResults = !emptySearchInput && searchResults.length > 0;

  return (
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
  );
};

export default Results;
