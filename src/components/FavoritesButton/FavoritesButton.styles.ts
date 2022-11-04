import styled from 'styled-components';

export const FavoritesButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.orange};
  border: none;
  transition: background-color 0.1s ease-in-out;
  padding: 6px;
  z-index: 99;

  svg {
    height: 24px;
    width: 24px;

    path {
      fill: white;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.orangeHover};
  }
`;
