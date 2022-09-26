import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
	from {
		opacity: 0;
	} to {
		opacity: 1;
	}
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 3rem;
  min-height: 300px;

  article {
    border: 1px solid ${({ theme }) => theme.colors.grey};
    border-radius: 1rem;
    transition: border-color 0.2s ease-in-out;
    text-align: center;
    overflow: hidden;

    animation: ${fadeIn} 1s forwards;

    a {
      text-decoration: none;
      color: black;
      height: 100%;
    }

    h3 {
      padding-inline: 1rem;
      padding: 2rem;
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

  ${({ theme }) => theme.mq.tablet} {
    article {
      max-width: 400px;
    }
  }

  ${({ theme }) => theme.mq.desktop} {
    grid-gap: 5rem 3rem;
  }
`;
