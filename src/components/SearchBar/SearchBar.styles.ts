import styled from 'styled-components';

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
  ${({ theme }) => theme.fadeInAnimation(0.4)};
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
  animation-delay: 0.2s;
  ${({ theme }) => theme.fadeInAnimation()};

  input {
    border-radius: 0px;
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

  div,
  p {
    ${({ theme }) => theme.fadeInAnimation(0.4)};
  }

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
  }
`;

export const FoundItem = styled.div`
  padding: 20px 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  transition: background-color 0.1s ease-in-out;

  div {
    background-color: ${({ theme }) => theme.colors.grey};
    display: flex;
  }

  ul {
    list-style: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    li {
      font-size: ${({ theme }) => theme.fontSize.caption};
      font-style: italic;
      margin-block: 4px;

      &:first-child {
        font-weight: 600;
        font-size: ${({ theme }) => theme.fontSize.paragraph};
        font-style: normal;
      }
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    gap: 20px;

    img {
      width: 120px !important;
      height: 120px !important;
    }
  }
`;
