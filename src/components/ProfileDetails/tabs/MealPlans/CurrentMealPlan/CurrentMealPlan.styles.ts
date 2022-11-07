import styled from 'styled-components';

export const MealPlanTitle = styled.div`
  margin-bottom: 1.6rem;

  h2 {
    font-family: ${({ theme }) => theme.fontFamily.lato};
    font-size: 2.4rem;
    font-style: normal;
    margin: 0;

    &::after {
      display: none;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    margin-bottom: 2.4rem;
  }
`;

export const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.themeColors.background};
  border: none;
  color: ${({ theme }) => theme.colors.red};
  text-decoration: underline;
  font-style: italic;

  &:hover {
    color: ${({ theme }) => theme.colors.redHover};
  }
`;

export const DaysBar = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green};
  border-top: 1px solid ${({ theme }) => theme.colors.green};
  padding-block: 1px;

  li {
    width: 100%;
    height: 100%;
  }
`;

export const DaysBarButton = styled.button<{ $isActive: boolean }>`
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.green : 'transparent')};
  color: ${({ theme, $isActive }) => ($isActive ? 'white' : theme.themeColors.font)};
  text-transform: capitalize;
  font-size: ${({ theme }) => theme.fontSize.caption};
  border: none;
  padding: 8px;
  transition: background-color 0.1s ease-in-out;
  width: 100%;
  height: 100%;

  &:hover {
    background-color: ${({ theme, $isActive }) => !$isActive && theme.themeColors.secondBackground};
  }

  ${({ theme }) => theme.mq.tablet} {
    font-size: 1.4rem;
  }
`;
