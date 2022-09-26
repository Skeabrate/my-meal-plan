import React from 'react';
import styled from 'styled-components';

const Main = styled.main`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;

  ${({ theme }) => theme.mq.desktop} {
    padding: 6rem;
  }
`;

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Main>{children}</Main>;
};

export default MainWrapper;
