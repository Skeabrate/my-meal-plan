import React from 'react';
import styled from 'styled-components';

const StyledMain = styled.main<{ $disableAnimation?: boolean }>`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;

  ${({ theme }) => theme.mq.desktop} {
    padding: 6rem;
  }
`;

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default MainWrapper;
