import styled from 'styled-components';

export const AddingMealModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const InnerWrapper = styled.div`
  position: absolute;
  width: 95%;
  height: 80%;
  background-color: ${({ theme }) => theme.themeColors.background};
  border: 1px solid ${({ theme }) => theme.themeColors.border};
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};

  ${({ theme }) => theme.mq.tablet} {
    padding: 2rem;
    width: 80%;
    max-width: 1000px;
  }
`;

export const TabsSwitch = styled.div`
  position: absolute;
  top: -40px;
  left: -1px;
  height: 40px;
  display: flex;
  gap: 6px;
`;

export const TabsSwitchButton = styled.button<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: 100%;
  width: 100px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.themeColors.background : theme.themeColors.secondBackground};
  border: 1px solid ${({ theme }) => theme.themeColors.border};
  border-bottom: none;
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: 600;
  font-style: italic;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.themeColors.font : theme.themeColors.secondFont};

  &::after {
    content: '';
    position: absolute;
    display: ${({ $isActive }) => ($isActive ? 'none' : 'initial')};
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.themeColors.border};
  }

  svg {
    width: 14px;
    height: 14px;

    path {
      fill: ${({ theme, $isActive }) =>
        $isActive ? theme.themeColors.font : theme.themeColors.secondFont};
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  h2 {
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily.lato};
    font-size: 2rem;

    &::after {
      display: none;
    }
  }

  button {
    background: transparent;
    border: none;
    display: flex;

    svg {
      width: 30px;
      height: 30px;
      transform: rotate(45deg);
    }
  }
`;
