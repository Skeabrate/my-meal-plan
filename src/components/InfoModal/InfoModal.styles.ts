import { ModalType } from 'context/ModalContext';
import styles, { DefaultTheme, keyframes } from 'styled-components';

const styled = { keyframes, ...styles };

const customFadeIn = styled.keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const timeout = styled.keyframes`
  from {
    transform: translateX(-50%) scaleX(0);
  }
  to {
    transform: translateX(-50%) scaleX(1);
  }
`;

const setColorBasedOnState = (theme: DefaultTheme, state: ModalType['state']) => {
  switch (state) {
    case 'success':
      return theme.colors.green;
    case 'error':
      return theme.colors.red;
    default:
      return theme.themeColors.font;
  }
};

export const InfoModal = styled.div<{ $state: ModalType['state'] }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: fixed;
  top: 10%;
  left: 50%;
  z-index: 9999;
  padding: 20px 30px 10px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.themeColors.background};
  color: ${({ theme, $state }) => setColorBasedOnState(theme, $state)};
  border: 2px solid ${({ theme, $state }) => setColorBasedOnState(theme, $state)};
  border-radius: 0px;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  animation: ${customFadeIn} 0.2s forwards;
`;

export const LoadingBar = styled.div<{ $state: ModalType['state'] }>`
  width: 100px;
  height: 5px;
  border-radius: 100px;
  background-color: transparent;
  border: 1px solid ${({ theme, $state }) => setColorBasedOnState(theme, $state)};
  overflow: hidden;
  position: relative;

  span {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: ${({ theme, $state }) => setColorBasedOnState(theme, $state)};
    transform-origin: left;
    transform: translateX(-50%) scaleX(0);

    animation: 3s ease-in forwards ${timeout};
  }
`;
