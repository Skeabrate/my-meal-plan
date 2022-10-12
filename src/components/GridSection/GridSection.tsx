import { useRef, useState } from 'react';
import Link from 'next/link';
import * as Styled from './GridSection.styles';
import { usePaginate } from 'hooks/usePaginate';
import SortDropdown from 'components/Dropdowns/SortDropdown';
import FavoritesButton from 'components/FavoritesButton/FavoritesButton';
import Loading from 'components/Loading/Loading';
import ImageLoading from 'components/ImageLoading/ImageLoading';

export type DataItemType = {
  id: string;
  name: string;
  img: string;
  slug: string;
};

type GridSectionType = {
  data: DataItemType[];
  linkUrl: string;
  label: {
    value: string;
    isMain?: boolean;
  };
  error: {
    value: unknown;
    fallbackMessage: string;
  };
  loadingData?: boolean;
  enableFavorites?: boolean;
};

const GridSection = ({
  data = [],
  linkUrl = '',
  label,
  enableFavorites,
  loadingData,
  error,
}: GridSectionType) => {
  const [loadingFilters, setLoadingFilters] = useState(false);

  const loadingRef = useRef<HTMLDivElement>(null);
  const { currentData } = usePaginate(data, loadingRef);

  const loadingState = loadingFilters || loadingData;
  const errorState = error.value;
  const displaySortDropdownState = !error.value && currentData.length > 1;
  const displayLoadingRefState = currentData.length < data.length;

  return (
    <>
      <Styled.Header>
        {label.isMain ? <h1>{label.value}</h1> : <h2>{label.value}</h2>}

        {displaySortDropdownState && (
          <SortDropdown
            itemsToSort={data}
            setLoadingFilters={setLoadingFilters}
          />
        )}
      </Styled.Header>

      {loadingState ? (
        <Loading />
      ) : errorState ? (
        <Styled.Error>{error.fallbackMessage}</Styled.Error>
      ) : (
        <Styled.Grid>
          {currentData.map(({ id, name, img, slug }) => (
            <article key={id}>
              {enableFavorites && <FavoritesButton mealId={id} />}
              <Link href={linkUrl + slug}>
                <a>
                  <div>
                    <ImageLoading
                      options={{
                        src: img,
                        alt: name,
                        layout: 'fill',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  <h3>{name}</h3>
                </a>
              </Link>
            </article>
          ))}
        </Styled.Grid>
      )}

      {displayLoadingRefState && <div ref={loadingRef} />}
    </>
  );
};

export default GridSection;
