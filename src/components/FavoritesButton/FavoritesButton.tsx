import { useContext, useMemo } from 'react';
import * as Styled from './FavoritesButton.styles';
import { FavoritesContext } from 'context/FavoritesContext';
import MarkedSvg from 'assets/SVG/Marked.svg';
import UnMarkedSvg from 'assets/SVG/UnMarked.svg';

const FavoritesButton = ({ mealId }: { mealId: string }) => {
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const isMealAlreadyFavorite = useMemo(
    () => favorites.some((item) => item === mealId),
    [favorites, mealId]
  );

  const handleFavorites = () => {
    if (isMealAlreadyFavorite) {
      setFavorites((state) => state.filter((item) => item !== mealId));
    } else {
      setFavorites((state) => [...state, mealId]);
    }
  };

  return (
    <Styled.FavoritesButton
      onClick={handleFavorites}
      aira-label='Add meal to favorites'
      title='Add to favorites'
    >
      {isMealAlreadyFavorite ? <MarkedSvg /> : <UnMarkedSvg />}
    </Styled.FavoritesButton>
  );
};

export default FavoritesButton;
