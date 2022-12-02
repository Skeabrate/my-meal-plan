import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 32px !important;
  height: 32px !important;
`;

export const ToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 100px;
  background-color: transparent;
  z-index: 0;

  span {
    width: 4px;
    height: 4px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.themeColors.font};
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.themeColors.background};
    transition: background-color 0.1s ease-in-out;
  }

  &:hover::after {
    background-color: ${({ theme }) => theme.themeColors.secondBackground};
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  z-index: 10;
  top: 100%;
  right: 0;
  width: max-content;
  margin-top: 6px;
  border: 1px solid ${({ theme }) => theme.themeColors.border};
  background-color: ${({ theme }) => theme.themeColors.background};
  list-style: none;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  ${({ theme }) => theme.fadeInAnimation(0.2)};

  button,
  a {
    width: 100%;
    padding: 10px;
    text-align: left;
    font-size: ${({ theme }) => theme.fontSize.caption};
    text-decoration: none;
    border: none;
    background-color: transparent;
    transition: 0.1s ease-in-out;
    display: flex;
    align-items: flex-end;
    gap: 6px;

    svg {
      height: 16px;
      width: 16px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.themeColors.secondBackground};
    }
  }
`;
