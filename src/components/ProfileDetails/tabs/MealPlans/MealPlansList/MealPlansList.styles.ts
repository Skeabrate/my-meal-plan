import styled from 'styled-components';

export const MealPlansList = styled.ul`
  list-style: none;

  li {
    display: flex;

    &:last-child button {
      border: none;
    }
  }
`;

export const ListItem = styled.button`
  display: grid;
  grid-template-columns: 50px 1fr;
  place-items: flex-start;
  align-items: center;
  width: 100%;
  padding: 15px;
  font-size: 2rem;
  word-break: break-word;
  background-color: ${({ theme }) => theme.themeColors.background};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.themeColors.border};
  transition: background-color 0.1s ease-in-out;

  span {
    font-family: ${({ theme }) => theme.fontFamily.abril};
    font-style: italic;
    cursor: pointer;
  }

  &:hover {
    background-color: ${({ theme }) => theme.themeColors.secondBackground};
  }
`;

export const OptionsButton = styled.button`
  width: 60px;
`;

export const AddMealPlanButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: transparent;
  border: none;
  padding: 10px 0;
  margin: 10px 0;

  svg {
    height: 46px;
    width: 46px;
    transition: 0.1s ease-in-out;

    path {
      fill: ${({ theme }) => theme.colors.orange};
    }
  }

  &:hover {
    svg {
      scale: 1.1;

      path {
        fill: hsl(22, 100%, 48%);
      }
    }
  }
`;
