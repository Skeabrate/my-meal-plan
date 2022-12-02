import React from 'react';
import styles, { keyframes } from 'styled-components';

const styled = { ...styles, keyframes };

const fadeInTablet = styled.keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.9;
  }
`;

const fadeInDesktop = styled.keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.8;
  }
`;

const StyledModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  z-index: -1;
  background-color: ${({ theme }) => theme.themeColors.background};
  animation: ${fadeInTablet} 0.4s forwards;

  ${({ theme }) => theme.mq.tablet} {
    opacity: 0.8;
    animation: ${fadeInDesktop} 0.4s forwards;
  }
`;

const ModalBackground = ({ actionHandler }: { actionHandler: () => void }) => {
  return (
    <StyledModalBackground
      role='button'
      aria-label='close a modal'
      onClick={actionHandler}
    />
  );
};

export default ModalBackground;
