import { useContext } from 'react';
import styled from 'styled-components';
import Dropdown from './template/Dropdown';
import DeleteSvg from 'assets/SVG/Delete.svg';
import PlusSvg from 'assets/SVG/Plus.svg';
import { AddingMealModalContext } from 'context/AddingMealModalContext';

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
  const { openModalHandler } = useContext(AddingMealModalContext);

  return (
    <StyledWrapper>
      <Dropdown>
        <li>
          <button onClick={() => openModalHandler(mealsSectionId)}>
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
