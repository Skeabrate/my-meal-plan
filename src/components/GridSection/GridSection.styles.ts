import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(-6px);
	} to {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  h2 {
    margin: 0;
  }

  ${({ theme }) => theme.mq.tablet} {
    margin-bottom: 6rem;
  }
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 4rem;
  min-height: 300px;

  article {
    border: 1px solid ${({ theme }) => theme.colors.grey};
    transition: border-color 0.2s ease-in-out;
    text-align: center;
    overflow: hidden;

    animation: ${fadeIn} 0.8s forwards;

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
      overflow: hidden;
      position: relative;
      height: 280px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
      background-color: ${({ theme }) => theme.colors.grey};

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
`;
