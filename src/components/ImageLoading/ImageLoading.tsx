import { useState } from 'react';
import Image from 'next/image';
import * as Styled from './ImageLoading.styles';

const ImageLoading = ({ options, children }: any) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const loadImageHandler = () => {
    setTimeout(() => {
      setIsImageLoaded(true);
    }, 2000);
  };

  return (
    <Styled.ImageLoading $isImageLoaded={isImageLoaded}>
      {!isImageLoaded && (
        <>
          <p></p>
          {children}
        </>
      )}

      <Image
        onLoad={loadImageHandler}
        alt=''
        {...options}
      />
    </Styled.ImageLoading>
  );
};

export default ImageLoading;
