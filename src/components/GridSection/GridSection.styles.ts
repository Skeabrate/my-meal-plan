import styled from 'styled-components';

export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 3rem;

  article {
    border: 1px solid ${({ theme }) => theme.colors.grey};
    border-radius: 10px;
    transition: border-color 0.2s ease-in-out;
    text-align: center;
    overflow: hidden;

    a {
      text-decoration: none;
      color: black;
      height: 100%;
    }

    h2 {
      padding-inline: 1rem;
      padding: 20px;
    }

    div {
      overflow: hidden;
      position: relative;
      height: 280px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};

      img {
        transition: scale 0.3s ease-in-out;
      }
    }

    &:hover {
      border-color: ${({ theme }) => theme.colors.orange};

      img {
        scale: 1.05;
      }
    }
  }

  ${({ theme }) => theme.mq.desktop} {
    grid-gap: 5rem 3rem;
  }
`;
