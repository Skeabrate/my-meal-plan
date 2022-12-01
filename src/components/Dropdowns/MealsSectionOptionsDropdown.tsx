import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { SearchBarContext } from 'context/SearchBarContext';
import Dropdown from './template/Dropdown';
import SearchSvg from 'assets/SVG/Search.svg';
import FavoritesSvg from 'assets/SVG/Marked.svg';
import PlusSvg from 'assets/SVG/Plus.svg';

const StyledWrapper = styled.div`
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

const OptionsDropdown = ({
  deleteHandler,
  mealsSectionId,
}: {
  deleteHandler: () => void;
  mealsSectionId: string;
}) => {
  const { toggleSearchBar } = useContext(SearchBarContext);

  // const { mutation: createMealInMealsSection, isLoading, isError, error } = useMutation();

  return (
    <StyledWrapper>
      <Dropdown>
        <li>
          <button onClick={toggleSearchBar}>
            <SearchSvg />
            <span>Search for a meal</span>
          </button>
        </li>
        <li>
          <Link href='/favorites'>
            <a>
              <FavoritesSvg />
              <span>Add from favorites</span>
            </a>
          </Link>
        </li>
        <li>
          <button onClick={deleteHandler}>
            <PlusSvg />
            <span>Delete meal section</span>
          </button>
        </li>
      </Dropdown>
    </StyledWrapper>
  );
};

export default OptionsDropdown;
