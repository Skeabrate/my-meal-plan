import { AlertModalType } from 'context/AlertModalContext';
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

const setColorBasedOnState = (theme: DefaultTheme, state: AlertModalType['state']) => {
  switch (state) {
    case 'success':
      return theme.colors.green;
    case 'error':
      return theme.colors.red;
    default:
      return theme.themeColors.font;
  }
};

export const AlertModal = styled.div<{ $state: AlertModalType['state'] }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
  position: fixed;
  top: 9%;
  left: 50%;
  z-index: 70;
  padding: 20px 30px 10px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.themeColors.background};
  color: ${({ theme, $state }) => setColorBasedOnState(theme, $state)};
  border: 1px solid ${({ theme, $state }) => setColorBasedOnState(theme, $state)};
  border-radius: 0px;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  animation: ${customFadeIn} 0.2s forwards;

  p {
    max-height: 100px;
    overflow-y: auto;
  }
`;

export const LoadingBar = styled.div<{ $state: AlertModalType['state'] }>`
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
