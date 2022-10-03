import styled from 'styled-components';

export const Header = styled.header`
  margin-bottom: 2rem;

  h1 {
    margin: 0 0 2rem 0;
  }

  div {
    background-color: ${({ theme }) => theme.colors.green};
    padding: 10px 20px;
    color: white;
    width: 100%;
    ${({ theme }) => theme.boxShadow(theme.colors.green)};
    ${({ theme }) => theme.fadeInAnimation()};
  }

  p {
    font-size: 1.4rem;
    margin-bottom: 2px;
    font-style: italic;

    span {
      margin-left: 10px;
      font-style: normal;
    }

    span,
    a {
      color: white;
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    margin-bottom: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      margin: 0 2rem 0 0;
    }

    div {
      width: fit-content;
    }
  }
`;

export const MealGrid = styled.div`
  display: grid;
  gap: 3rem;

  ${({ theme }) => theme.mq.desktop} {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
  }
`;

export const Gallery = styled.article`
  div {
    position: relative;
    width: 100%;
    height: 350px;
    background-color: ${({ theme }) => theme.colors.grey};
    margin-bottom: 1rem;
  }

  ${({ theme }) => theme.mq.tablet} {
    div {
      height: 600px;
      margin-bottom: 3rem;
    }

    iframe {
      height: 400px;
    }
  }
`;

export const DetailsWrapper = styled.article`
  position: sticky;
  top: 1px;
  height: fit-content;
`;

export const DetailsBar = styled.div`
  display: flex;
  gap: 1px;
  background-color: ${({ theme }) => theme.colors.green};
`;

export const SwitchDetailsButton = styled.button<{ $isActive: boolean }>`
  width: 50%;
  border: none;
  padding-block: 25px;
  margin-bottom: 1px;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.paragraph};
  transition: background-color 0.1s ease-in-out;
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.colors.green : 'white')};
  color: ${({ $isActive }) => ($isActive ? 'white' : 'black')};
  box-shadow: inset 0 0 0 1px white;

  &:hover {
    background-color: ${({ $isActive, theme }) => !$isActive && theme.colors.lightGrey};
  }
`;

export const Details = styled.div<{ $areIngredientsActive: boolean }>`
  padding: 20px 0;

  ${({ theme }) => theme.fadeInAnimation()};

  p {
    padding: 20px 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
    display: grid;
    grid-template-columns: minmax(70px, auto) 1fr;
    align-items: center;
    text-align: ${({ $areIngredientsActive }) => $areIngredientsActive && 'right'};

    &:last-child {
      border: none;
    }

    span {
      font-weight: 600;
      text-align: left;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    padding: 20px 10px;

    p {
      padding: 20px 30px;
    }
  }

  ${({ theme }) => theme.mq.desktop} {
    overflow-y: auto;
    max-height: calc(100vh - 90px);
    margin-block: 10px;
  }
`;
