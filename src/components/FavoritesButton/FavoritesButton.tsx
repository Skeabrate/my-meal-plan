import React from 'react';
import styled from 'styled-components';
import MarkedSvg from 'assets/SVG/Marked.svg';
import UnMarkedSvg from 'assets/SVG/UnMarked.svg';

const StyledFavoritesButton = styled.button`
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

const FavoritesButton = () => {
  const isFavorite = false;

  const handleFavorites = () => {};

  return (
    <StyledFavoritesButton
      onClick={handleFavorites}
      aira-label='Add meal to favorites'
      title='Add to favorites'
    >
      {isFavorite ? <MarkedSvg /> : <UnMarkedSvg />}
    </StyledFavoritesButton>
  );
};

export default FavoritesButton;
