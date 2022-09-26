import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './GridSection.styles';

type GridSectionType = {
  data: { id: string; name: string; img: string; slug: string }[];
  linkUrl: string;
};

const GridSection = ({ data = [], linkUrl = '' }: GridSectionType) => {
  return (
    <Styled.Grid>
      {data.map(({ id, name, img, slug }) => (
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
  );
};

export default GridSection;
