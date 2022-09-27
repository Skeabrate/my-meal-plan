import styled, { keyframes } from 'styled-components';

const fadedIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(-10px);
	} to{
		opacity: 1;
		transform: translateY(0);
	}
`;

export const Wrapper = styled.div`
  border: 1px solid black;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.2rem;
  position: relative;
  background-color: white;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.orange};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.orange};
    outline: 2px solid ${({ theme }) => theme.colors.orange};
  }

  ${({ theme }) => theme.mq.tablet} {
    width: 150px;
    height: 50px;
    font-size: 1.6rem;
  }
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: -1px;
  border: 1px solid black;
  list-style: none;
  width: calc(100% + 2px);
  z-index: 1;
  background-color: white;
  animation: ${fadedIn} 0.2s forwards;
`;

export const DropdownListItem = styled.li`
  &:first-child {
    margin-bottom: 2px;
  }

  button {
    height: 40px;
    width: 100%;
    background-color: white;
    border: none;
    text-align: center;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightGrey};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.orange};
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    button {
      height: 50px;
      padding: 15px 20px;
      text-align: left;
    }
  }
`;
