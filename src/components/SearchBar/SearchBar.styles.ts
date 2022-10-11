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
  opacity: 0.9;
  z-index: -1;
  background-color: ${({ theme }) => theme.colors.background};

  ${({ theme }) => theme.mq.tablet} {
    opacity: 0.7;
  }
`;

export const SearchBarInner = styled.div`
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.colors.background};

  ${({ theme }) => theme.mq.tablet} {
    width: 600px;
    padding: 80px 80px 40px;
  }
`;

export const InputWrapper = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  gap: 6px;
  opacity: 0;
  position: relative;
  ${({ theme }) => theme.fadeInAnimation(0.4)};
  animation-delay: 0.2s;

  input {
    padding: 0 15px;
    height: 100%;
    width: calc(100% - 42px);
    border: 1px solid red;

    &:focus {
      ${({ theme }) => theme.boxShadow(theme.colors.green)}
      outline: none;
    }
  }

  button {
    height: 40px;
    width: 40px;

    svg {
      width: 100%;
      height: 100%;

      path {
        fill: ${({ theme }) => theme.colors.secondFont};
      }
    }
  }

  button,
  input {
    border-radius: 0px;
    border: 2px solid ${({ theme }) => theme.colors.secondFont};
    background-color: transparent;
  }
`;
