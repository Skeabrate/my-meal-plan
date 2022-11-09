import React from 'react';
import styled from 'styled-components';

const StyledImageLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  background-color: ${({ theme }) => theme.themeColors.border};
`;

const ImageLoading = ({ children }: { children: React.ReactNode }) => {
  return <StyledImageLoading>{children}</StyledImageLoading>;
};

export default ImageLoading;
