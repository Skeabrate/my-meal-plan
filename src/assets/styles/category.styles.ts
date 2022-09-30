import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
	from{
		transform: translateX(-10px);
		opacity: 0;
	} to {
		transform: translateX(0);
		opacity: 1;
	}
`;

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
    box-shadow: 0 0 0 1px white, 0 0 0 2px ${({ theme }) => theme.colors.green};
    animation: ${slideIn} 0.6s forwards;
  }

  ${({ theme }) => theme.mq.tablet} {
    grid-template-columns: 1fr 1fr;
    margin-bottom: 10rem;
  }
`;
