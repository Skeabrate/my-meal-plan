import React from 'react';
import styled from 'styled-components';

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

  ${({ theme }) => theme.mq.tablet} {
    opacity: 0.8;
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
