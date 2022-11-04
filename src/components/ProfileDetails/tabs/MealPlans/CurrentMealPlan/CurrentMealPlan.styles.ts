import styled from 'styled-components';

export const MealPlanTitle = styled.div`
  margin-bottom: 2rem;

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
    margin-bottom: 3rem;
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
`;
