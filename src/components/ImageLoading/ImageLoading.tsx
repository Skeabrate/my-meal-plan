import Image from 'next/image';
import * as Styled from './ImageLoading.styles';

const ImageLoading = ({ options, children }: any) => {
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
