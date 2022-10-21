import Image from 'next/image';
import React from 'react';
import * as Styled from './ImageLoading.styles';

const ImageLoading = ({
  options: { alt = '', ...options },
  children,
}: {
  options: any;
  children?: React.ReactNode;
}) => {
  return (
    <Styled.ImageLoading>
      <Image
        alt={alt}
        {...options}
      />
      {children}
    </Styled.ImageLoading>
  );
};

export default ImageLoading;
