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
  }
`;

export const Gallery = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    height: 350px;
  }

  ${({ theme }) => theme.mq.tablet} {
    gap: 3rem;

    div {
      height: 600px;
    }

    iframe {
      height: 400px;
      border: none;
    }
  }
`;
