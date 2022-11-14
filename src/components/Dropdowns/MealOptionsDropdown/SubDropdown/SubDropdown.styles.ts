import styled from 'styled-components';

export const SubDropdown = styled.ul`
  ${({ theme }) => theme.fadeInAnimation(0.2)};
  list-style: none;
  position: absolute;
  width: calc(100% + 2px);
  max-height: 200px;
  top: 100%;
  left: -1px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.themeColors.background};
  border: 1px solid ${({ theme }) => theme.themeColors.border};
  overflow-y: auto;
`;

export const Label = styled.button<{ $isDisabled?: boolean }>`
  background-color: ${({ theme }) => theme.colors.green} !important;
  color: white;
  font-weight: 600;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'initial' : 'pointer')};

  svg {
    transition: 0.2s ease-in-out;

    path {
      fill: white;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.green} !important;

    svg {
      transform: translateX(-2px);
    }
  }
`;

export const MealPlansNotFound = styled.li`
  font-size: ${({ theme }) => theme.fontSize.caption};
  padding: 10px;
`;

export const Day = styled.button`
  text-transform: capitalize;
`;
