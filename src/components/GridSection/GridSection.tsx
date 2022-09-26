import React, { useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './GridSection.styles';
import { usePaginate } from 'hooks/usePaginate';

type GridSectionType = {
  data: { id: string; name: string; img: string; slug: string }[];
  linkUrl: string;
};

const GridSection = ({ data = [], linkUrl = '' }: GridSectionType) => {
  const loadingRef = useRef<HTMLDivElement>(null);

  const { currentData } = usePaginate(data, loadingRef);

  useEffect(() => {
    console.log('mount');

    return () => console.log('unmount');
  }, []);

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
                    sizes='100vw'
                    objectFit='cover'
                  />
                </div>

                <h3>{name}</h3>
              </a>
            </Link>
          </article>
        ))}
      </Styled.Grid>

      {currentData.length < data.length && (
        <div
          style={{ width: '100px', height: '20px', background: 'red' }}
          ref={loadingRef}
        />
      )}
    </>
  );
};

export default GridSection;
