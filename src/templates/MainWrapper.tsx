import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const appearAnimation = keyframes`
	from{
		opacity: 0;
	} to {
		opacity: 1;
	}
`;

const StyledMain = styled.main<{ $disableAnimation?: boolean }>`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  ${({ $disableAnimation }) =>
    !$disableAnimation &&
    css`
      animation: ${appearAnimation} 0.4s forwards;
    `}

  ${({ theme }) => theme.mq.desktop} {
    padding: 6rem;
  }
`;

const MainWrapper = ({
  children,
  disableAnimation,
}: {
  children: React.ReactNode;
  disableAnimation?: boolean;
}) => {
  return <StyledMain $disableAnimation={disableAnimation}>{children}</StyledMain>;
};

export default MainWrapper;
