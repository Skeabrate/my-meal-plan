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
  padding: 10px;
  z-index: 99;

  svg {
    path {
      fill: white;
    }
  }

  &:hover {
    background-color: #ff7e33;
  }
`;
