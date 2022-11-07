import styled from 'styled-components';

export const MealPlan = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.themeColors.border};
  padding: 15px 0;

  &:last-child {
    border: none;
  }

  h3 {
    font-family: ${({ theme }) => theme.fontFamily.lato};
    font-weight: 600;
    font-style: normal;
    font-size: 2rem;
    margin-bottom: 12px;
    text-transform: capitalize;
  }

  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 1rem;

    li,
    button {
      font-size: ${({ theme }) => theme.fontSize.caption};
    }

    li {
      font-weight: 600;

      p {
        padding: 2px 4px;
      }

      button {
        display: block;
        background: transparent;
        border: none;
        color: ${({ theme }) => theme.colors.red};
        text-decoration: underline;
        font-style: italic;
        padding-top: 2px;
      }
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    padding: 20px 10px;
  }
`;

export const AddMealsSectionButton = styled.button`
  border: none;
  background: transparent;
  font-style: italic;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.green};
  padding-block: 15px;
  display: block;
`;
