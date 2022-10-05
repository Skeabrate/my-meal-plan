import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  h1,
  h2 {
    margin: 0;
  }

  ${({ theme }) => theme.mq.tablet} {
    margin-bottom: 6rem;
  }
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-gap: 4rem;

  article {
    border: 1px solid ${({ theme }) => theme.colors.grey};
    text-align: center;
    overflow: hidden;
    opacity: 0;
    position: relative;
    ${({ theme }) => theme.fadeInAnimation()};
    transition: box-shadow 0.4s ease-in-out;

    a {
      text-decoration: none;
      color: black;
      height: 100%;

      &:focus {
        text-decoration: underline;
        outline: none;
        color: ${({ theme }) => theme.colors.orange};
      }
    }

    h3 {
      padding-inline: 1rem;
      padding: 2rem;
    }

    div {
      height: 280px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.grey};

      img {
        transition: scale 0.4s ease-in-out;
      }
    }

    &:hover {
      box-shadow: 0px 0px 35px -25px rgba(0, 0, 0, 1);

      img {
        scale: 1.05;
      }
    }
  }
`;

export const Error = styled.p`
  height: 400px;
  font-style: italic;

  ${({ theme }) => theme.mq.tablet} {
    font-size: 1.8rem;
  }
`;
