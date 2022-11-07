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
  }

  ${({ theme }) => theme.mq.tablet} {
    padding: 20px 10px;
  }
`;
