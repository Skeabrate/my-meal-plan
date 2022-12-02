import { useContext } from 'react';
import styled from 'styled-components';
import { AddingMealModalContext } from 'context/AddingMealModalContext';
import DeleteSvg from 'assets/SVG/Delete.svg';
import PlusSvg from 'assets/SVG/Plus.svg';
import Dropdown from './template/Dropdown';

const StyledWrapper = styled.div`
  li:last-child button {
    color: ${({ theme }) => theme.colors.red};

    svg {
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

const OptionsDropdown = ({
  deleteHandler,
  mealsSectionId,
}: {
  deleteHandler: () => void;
  mealsSectionId: string;
}) => {
  const { openAddingMealModalHandler } = useContext(AddingMealModalContext);

  return (
    <StyledWrapper>
      <Dropdown>
        <li>
          <button onClick={() => openAddingMealModalHandler(mealsSectionId)}>
            <PlusSvg />
            <span>Add new meal</span>
          </button>
        </li>

        <li>
          <button onClick={deleteHandler}>
            <DeleteSvg />
            <span>Delete meals section</span>
          </button>
        </li>
      </Dropdown>
    </StyledWrapper>
  );
};

export default OptionsDropdown;
