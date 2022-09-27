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
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.5rem;
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
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 115%;
  border: 1px solid black;
  list-style: none;
  width: 100%;
  z-index: 1;
  background-color: white;
  animation: ${fadedIn} 0.2s forwards;
`;

export const DropdownListItem = styled.li`
  &:first-child {
    margin-bottom: 2px;
  }

  button {
    width: 100%;
    height: 100%;
    padding: 15px 20px;
    background-color: white;
    border: none;
    text-align: left;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightGrey};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.orange};
    }
  }
`;
