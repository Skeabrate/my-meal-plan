import styled from 'styled-components';

export const Options = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
`;

export const OptionsButton = styled.button`
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
    background-color: ${({ theme }) => theme.themeColors.secondBackground};
    opacity: 0;
    transition: 0.1s ease-in-out;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const OptionsDropdown = styled.ul`
  position: absolute;
  z-index: 10;
  top: 100%;
  right: 0;
  width: max-content;
  margin-top: 6px;
  border: 1px solid ${({ theme }) => theme.themeColors.border};
  background-color: ${({ theme }) => theme.themeColors.background};
  list-style: none;
  ${({ theme }) => theme.fadeInAnimation(0.2)};

  button {
    width: 100%;
    padding: 10px 10px;
    text-align: left;
    border: none;
    background-color: transparent;
    transition: 0.1s ease-in-out;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      height: 14px;
      width: 14px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.themeColors.secondBackground};
    }
  }

  li:last-child button {
    color: ${({ theme }) => theme.colors.red};

    svg {
      transform: rotate(45deg);

      path {
        transition: 0.1s ease-in-out;
        fill: ${({ theme }) => theme.colors.red};
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.red};
      color: white;

      svg path {
        fill: white;
      }
    }
  }
`;
