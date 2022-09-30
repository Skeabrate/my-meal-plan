import styled from 'styled-components';

export const Intro = styled.section`
  display: grid;
  grid-gap: 3rem;
  align-items: flex-end;
  margin-bottom: 6rem;

  h1 {
    margin-bottom: 2rem;
  }

  p {
    background-color: ${({ theme }) => theme.colors.green};
    padding: 2rem;
    color: white;
    line-height: 1.5;
    ${({ theme }) => theme.boxShadow(theme.colors.green)};
    ${({ theme }) => theme.slideInAnimation()};
  }

  ${({ theme }) => theme.mq.tablet} {
    grid-template-columns: 1fr 1fr;
    margin-bottom: 10rem;
  }
`;
