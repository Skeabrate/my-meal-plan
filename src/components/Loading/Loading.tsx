import React from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

export const StyledLoading = styled.p<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = ({ height = 400 }: { height?: number }) => {
  return (
    <StyledLoading $height={height}>
      <ClipLoader />
    </StyledLoading>
  );
};

export default Loading;
