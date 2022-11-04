import styled from 'styled-components';

export const DeleteMealPLanButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 60px;
  height: 100%;
  background: transparent;
  border: none;
  opacity: 0;
  visibility: hidden;
  transition: 0.1s ease-in-out;

  svg {
    height: 24px;
    width: 24px;
    transform: rotate(45deg);
    transition: 0.1s ease-in-out;

    path {
      fill: ${({ theme }) => theme.colors.red};
      transition: 0.1s ease-in-out;
    }
  }

  &:hover {
    svg {
      scale: 1.1;

      path {
        fill: ${({ theme }) => theme.colors.redHover};
      }
    }
  }
`;

export const MealPlansList = styled.ul`
  list-style: none;

  li {
    position: relative;

    &:hover ${DeleteMealPLanButton} {
      opacity: 1;
      visibility: visible;
    }

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

export const AddMealPlanButton = styled.button<{ $isAddMealPLanInputOpen: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  background: transparent;
  border: none;
  padding: 20px 0;
  margin: 20px auto;

  svg {
    height: 46px;
    width: 46px;
    transform: ${({ $isAddMealPLanInputOpen }) => $isAddMealPLanInputOpen && 'rotate(135deg)'};
    transition: scale 0.2s ease-in-out, transform 0.6s cubic-bezier(0.3, 0, 0, 1);

    path {
      fill: ${({ theme, $isAddMealPLanInputOpen }) =>
        $isAddMealPLanInputOpen ? theme.colors.red : theme.colors.orange};
      transition: 0.2s ease-in-out;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    min-width: 200px;
    width: 30vw;
    max-width: 600px;
    height: 1px;
    background-color: ${({ theme }) => theme.themeColors.border};
  }

  &:hover {
    svg {
      scale: 1.1;

      path {
        fill: ${({ theme, $isAddMealPLanInputOpen }) =>
          $isAddMealPLanInputOpen ? theme.colors.redHover : theme.colors.orangeHover};
      }
    }
  }
`;

export const AddMealPlanForm = styled.form`
  ${({ theme }) => theme.fadeInAnimation(0.2)}
`;

export const AddMealPlanInput = styled.input`
  border: 2px solid ${({ theme }) => theme.themeColors.secondFont};
  padding: 10px;
  margin-bottom: 10px;
`;
