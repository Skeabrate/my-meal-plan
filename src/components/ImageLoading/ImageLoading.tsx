import Image from 'next/image';
import React from 'react';
import * as Styled from './ImageLoading.styles';

const ImageLoading = ({ options, children }: { options: any; children?: React.ReactNode }) => {
  return (
    <Styled.ImageLoading>
      <Image
        alt=''
        {...options}
      />
      {children}
    </Styled.ImageLoading>
  );
};

export default ImageLoading;
