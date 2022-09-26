import React from 'react';
import styled from 'styled-components';

const Main = styled.main`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;

  h1 {
    margin-bottom: 20px;
  }

  ${({ theme }) => theme.mq.desktop} {
    padding: 6rem;

    h1 {
      margin-bottom: 40px;
    }
  }
`;

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Main>{children}</Main>;
};

export default MainWrapper;
