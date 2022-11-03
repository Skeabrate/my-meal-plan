import styled from 'styled-components';

export const MealPlansList = styled.ul`
  list-style: none;

  li {
    display: flex;
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
