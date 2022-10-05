import styled from 'styled-components';

export const ImageLoading = styled.div<{ $isImageLoaded: boolean }>`
  display: flex;
  position: relative;

  p {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.grey};
    ${({ theme }) => theme.loadingAnimation()};
  }

  img {
    opacity: ${({ $isImageLoaded }) => ($isImageLoaded ? 1 : 0)} !important;
    transition: opacity 0.4s ease-in-out;
  }
`;
