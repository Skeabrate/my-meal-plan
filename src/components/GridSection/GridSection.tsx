import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './GridSection.styles';
import { usePaginate } from 'hooks/usePaginate';
import SortCombobox from 'components/Comboboxes/SortCombobox';
import Loading from 'components/Loading/Loading';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import MealOptionsDropdown from 'components/Dropdowns/MealOptionsDropdown/MealOptionsDropdown';

export type DataItemType = {
  id: string;
  name: string;
  img: string;
  slug: string;
};

type GridSectionType = {
  data: DataItemType[] | undefined;
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
  enableOptionsButton?: boolean;
};

const GridSection = ({
  data = [],
  linkUrl = '',
  label,
  enableOptionsButton,
  loadingData,
  error,
}: GridSectionType) => {
  const [loadingFilters, setLoadingFilters] = useState(false);

  const loadingRef = useRef<HTMLDivElement>(null);
  const { currentData } = usePaginate(data, loadingRef);

  const loadingState = loadingFilters || loadingData;
  const errorState = error.value;
  const displaySortComboboxState = !error.value && currentData.length > 1;
  const displayLoadingRefState = currentData.length < data.length;

  return (
    <>
      <Styled.Header>
        {label.isMain ? <h1>{label.value}</h1> : <h2>{label.value}</h2>}

        {displaySortComboboxState && (
          <SortCombobox
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
            <Styled.GridItem key={id}>
              {enableOptionsButton && <MealOptionsDropdown mealId={id} />}
              <Link href={linkUrl + slug}>
                <a>
                  <Styled.GridItemImage>
                    <ImageLoading>
                      <Image
                        src={img}
                        alt={name}
                        layout={'fill'}
                        objectFit={'cover'}
                      />
                    </ImageLoading>
                  </Styled.GridItemImage>

                  <h3>{name}</h3>
                </a>
              </Link>
            </Styled.GridItem>
          ))}
        </Styled.Grid>
      )}

      {displayLoadingRefState && <div ref={loadingRef} />}
    </>
  );
};

export default GridSection;
