import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './GridSection.styles';
import { usePaginate } from 'hooks/usePaginate';
import SortDropdown from 'components/SortDropdown/SortDropdown';
import FavoritesButton from 'components/FavoritesButton/FavoritesButton';

export type DataItemType = {
  id: string;
  name: string;
  img: string;
  slug: string;
};

type GridSectionType = {
  data: DataItemType[];
  linkUrl: string;
  label: string;
  enableFavorites: boolean;
};

const GridSection = ({ data = [], linkUrl = '', label, enableFavorites }: GridSectionType) => {
  const [loadingFilters, setLoadingFilters] = useState(false);

  const loadingRef = useRef<HTMLDivElement>(null);
  const { currentData } = usePaginate(data, loadingRef);

  const displayLoadingRef = currentData.length < data.length;

  return (
    <>
      <Styled.Header>
        <h2>{label}</h2>

        <SortDropdown
          data={data}
          loadingFilters={loadingFilters}
          setLoadingFilters={setLoadingFilters}
        />
      </Styled.Header>

      {loadingFilters ? (
        <div style={{ height: '400px' }}></div>
      ) : (
        <Styled.Grid>
          {currentData.map(({ id, name, img, slug }) => (
            <article key={id}>
              {enableFavorites && <FavoritesButton />}
              <Link href={`/${linkUrl}/${slug}`}>
                <a>
                  <div>
                    <Image
                      src={img}
                      alt={name}
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>

                  <h3>{name}</h3>
                </a>
              </Link>
            </article>
          ))}
        </Styled.Grid>
      )}

      {displayLoadingRef && <div ref={loadingRef} />}
    </>
  );
};

export default GridSection;
