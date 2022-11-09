import { useFavorites } from 'context/FavoritesContext';
import Dropdown from './template/Dropdown';
import MarkedSvg from 'assets/SVG/Marked.svg';
import UnMarkedSvg from 'assets/SVG/UnMarked.svg';
import MealSvg from 'assets/SVG/Meal.svg';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
`;

const MealOptionsDropdown = ({ mealId }: { mealId: string }) => {
  const { isMealAlreadyFavorite, handleFavorites } = useFavorites(mealId);

  return (
    <StyledWrapper>
      <Dropdown>
        <li>
          <button onClick={handleFavorites}>
            {isMealAlreadyFavorite ? (
              <>
                <MarkedSvg />
                <span>Remove from favorites</span>
              </>
            ) : (
              <>
                <UnMarkedSvg />
                <span>Add to favorites</span>
              </>
            )}
          </button>
        </li>

        <li>
          <button>
            <MealSvg />
            <span>Add to Meal Plan</span>
          </button>
        </li>
      </Dropdown>
    </StyledWrapper>
  );
};

export default MealOptionsDropdown;
