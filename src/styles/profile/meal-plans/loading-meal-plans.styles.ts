import styled from 'styled-components';

export const Header = styled.header`
  background-color: ${({ theme }) => theme.themeColors.secondBackground};
  width: 70%;

  h1 {
    height: 36px;
  }

  ${({ theme }) => theme.mq.tablet} {
    width: 100%;
  }
`;

export const Content = styled.div`
  h2,
  h3,
  p,
  button {
    background-color: ${({ theme }) => theme.themeColors.secondBackground};
    ${({ theme }) => theme.loadingAnimation()};
  }

  button {
    background-color: ${({ theme }) => theme.themeColors.border};
    border: none;
  }

  h2 {
    height: 28px;
    width: 100%;
    margin: 0 0 4px 0;

    &::after {
      display: none;
    }
  }

  button {
    height: 21px;
    width: 100px;
    margin-bottom: 16px;
  }

  ${({ theme }) => theme.mq.tablet} {
    padding: 30px;

    h2 {
      width: 50%;
    }
  }

  ${({ theme }) => theme.mq.desktop} {
    padding: 50px;
  }
`;

export const Days = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 16px;

  p {
    width: 100%;
    height: 30px;
    background-color: ${({ theme }) => theme.themeColors.border} !important;
  }

  ${({ theme }) => theme.mq.tablet} {
    margin-bottom: 24px;

    p {
      height: 36px;
    }
  }
`;

export const Meals = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
`;

export const MealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    height: 24px;
    width: 200px;
  }

  button {
    width: 32px;
    height: 32px;
    border-radius: 100px;
    margin: 0;
  }
`;

export const Meal = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 1rem;

  p:first-child {
    aspect-ratio: 1;
  }

  p:nth-child(2) {
    margin-top: 6px;
    width: 80%;
    height: 16px;
  }

  button {
    height: 16px;
    margin-top: 3px;
    width: 40px;
  }
`;
