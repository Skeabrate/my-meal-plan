import styled from 'styled-components';

export const MealPlan = styled.div`
  border-top: 1px solid ${({ theme }) => theme.themeColors.border};
  padding: 6px 0 20px;

  ${({ theme }) => theme.mq.tablet} {
    padding: 6px 0 28px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    font-family: ${({ theme }) => theme.fontFamily.lato};
    font-weight: 600;
    font-style: normal;
    font-size: 2rem;
    text-transform: capitalize;
  }
`;

export const MealsGrid = styled.ul`
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
    height: fit-content;

    span {
      display: block;
      padding: 3px 3px 0 3px;
    }

    img {
      transition: scale 0.2s ease-in-out;

      &:hover {
        scale: 1.05;
      }
    }
  }
`;
