import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './GridSection.styles';
import { usePaginate } from 'hooks/usePaginate';
import Placeholder from 'assets/placeholder.png';

type GridSectionType = {
  data: { id: string; name: string; img: string; slug: string }[];
  linkUrl: string;
};

const GridSection = ({ data = [], linkUrl = '' }: GridSectionType) => {
  const loadingRef = useRef<HTMLDivElement>(null);

  const { currentData } = usePaginate(data, loadingRef);

  const displayLoadingRef = currentData.length < data.length;

  return (
    <>
      <Styled.Grid>
        {currentData.map(({ id, name, img, slug }) => (
          <article key={id}>
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

      {displayLoadingRef && <div ref={loadingRef} />}
    </>
  );
};

export default GridSection;
