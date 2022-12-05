import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './Results.styles';
import { ResizeWindowContext } from 'context/ResizeWindowContext';
import { useSearchResults } from 'hooks/useSearchResults';
import { ROUTES } from 'utils/routes';
import Loading from 'components/Loading/Loading';
import ImageLoading from 'components/ImageLoading/ImageLoading';

const Results = ({ inputValue }: { inputValue: string }) => {
  const { searchResults, isLoading, isError, error, noMatchingResults, matchingResults } =
    useSearchResults(inputValue);

  const { windowHeight } = useContext(ResizeWindowContext);

  return (
    <Styled.Results $windowHeight={windowHeight}>
      {isLoading && <Loading />}
      {isError && <Styled.Error>An error occured: {error}</Styled.Error>}
      {noMatchingResults && <Styled.Error>Meal not found.</Styled.Error>}
      {matchingResults && (
        <div>
          {searchResults?.map(({ idMeal, strMeal, strCategory, strArea, strMealThumb }) => (
            <Link
              href={`${ROUTES.meal}${idMeal}`}
              key={idMeal}
            >
              <a>
                <Styled.FoundItem>
                  <ImageLoading>
                    <Image
                      src={strMealThumb}
                      alt={strMeal}
                      height={100}
                      width={100}
                      objectFit={'contain'}
                    />
                  </ImageLoading>

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
