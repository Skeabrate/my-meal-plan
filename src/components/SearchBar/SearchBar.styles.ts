import styled from 'styled-components';

export const SearchBar = styled.div<{ $isSearchBarOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchBarInner = styled.div`
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.themeColors.background};

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
  }

  button {
    height: 40px;
    width: 40px;

    svg {
      width: 100%;
      height: 100%;

      path {
        fill: ${({ theme }) => theme.themeColors.secondFont};
      }
    }
  }

  button,
  input {
    border-radius: 0px;
    border: 2px solid ${({ theme }) => theme.themeColors.secondFont};
    background-color: ${({ theme }) => theme.themeColors.background};
  }

  button:focus {
    ${({ theme }) => theme.boxShadow(theme.colors.orange)}
    outline: none;
  }
`;
