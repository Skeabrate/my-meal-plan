import React from 'react';
import styled from 'styled-components';

const StyledPage = styled.main<{ $disableAnimation?: boolean }>`
  padding: 4rem 2rem;
  min-width: 320px;
  max-width: 1400px;
  margin: 0 auto;

  ${({ theme }) => theme.mq.desktop} {
    padding: 6rem;
  }
`;

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <StyledPage>{children}</StyledPage>;
};

export default PageWrapper;
