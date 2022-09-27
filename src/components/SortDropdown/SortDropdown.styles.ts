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
  cursor: pointer;
  position: relative;

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.orange};
    outline: none;
  }
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  border: 1px solid black;
  list-style: none;
  width: 100%;
  z-index: 1;
  background-color: white;
  animation: ${fadedIn} 0.2s forwards;
  li {
    padding: 10px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightGrey};
    }
  }
`;
