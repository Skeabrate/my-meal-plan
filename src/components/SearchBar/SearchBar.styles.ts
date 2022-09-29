import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
	from{
		opacity: 0;
	} to {
		opacity: 1;
	}
`;

const slideIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(-10px);
	} to{
		opacity: 1;
		transform: translateY(0);
	}
`;

export const SearchBar = styled.div<{ $isSearchBarOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} forwards 0.4s;
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.7;
  z-index: -1;
`;

export const SearchBarInner = styled.div`
  width: 360px;
  padding: 40px;
  background: white;

  ${({ theme }) => theme.mq.tablet} {
    width: 600px;
    padding: 80px 80px 40px;
  }
`;

export const InputWrapper = styled.div`
  height: 40px;
  position: relative;
  opacity: 0;
  animation: ${slideIn} forwards 0.2s;
  animation-delay: 0.2s;

  input {
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.colors.blue};
    height: 100%;
    padding: 0 15px;
    width: 100%;

    &:focus {
      box-shadow: 0 0 0 2px white, 0 0 0 3px ${({ theme }) => theme.colors.green};
      outline: none;
    }
  }

  button {
    height: calc(100% - 6px);
    border: none;
    position: absolute;
    right: 3px;
    top: 3px;
    background: transparent;

    svg {
      width: 100%;
      height: 100%;

      path {
        fill: ${({ theme }) => theme.colors.blue};
      }
    }
  }
`;

export const Results = styled.div`
  margin-top: 10px;
  overflow-y: auto;
  padding: 10px;
  max-height: calc(100vh - 130px);

  a {
    color: black;
    text-decoration: none;

    &:last-child div {
      border: none;
    }

    &:hover div {
      background-color: ${({ theme }) => theme.colors.lightGrey};
    }
  }

  p {
    margin-top: 10px;
    text-align: center;
  }

  div {
    padding: 20px 10px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 14px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
    transition: background-color 0.1s ease-in-out;
  }

  ul {
    list-style: none;
    padding-block: 10px;
    height: 100%;

    li {
      font-size: ${({ theme }) => theme.fontSize.caption};
      font-style: italic;
      margin-bottom: 4px;

      &:first-child {
        font-weight: 600;
        font-size: ${({ theme }) => theme.fontSize.paragraph};
        font-style: normal;
      }
    }
  }

  ::-webkit-scrollbar-track {
    background-color: white;
  }
  ::-webkit-scrollbar {
    width: 12px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey};
    border-radius: 100px;
    border: 3px solid white;
    background-clip: padding-box;
  }

  ${({ theme }) => theme.mq.tablet} {
    padding: 10px 20px;
    max-height: calc(100vh - 170px);

    img {
      width: 150px !important;
      height: 150px !important;
    }

    div {
      gap: 20px;
    }

    ul {
      padding-block: 15px;
    }
  }
`;
