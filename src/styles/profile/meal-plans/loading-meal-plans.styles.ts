import styled from 'styled-components';

export const Header = styled.header`
  background-color: ${({ theme }) => theme.themeColors.secondBackground};
  width: 70%;

  h1 {
    height: 36px;
  }

  ${({ theme }) => theme.mq.tablet} {
    width: 100%;
  }
`;

export const Content = styled.div`
  h2,
  h3,
  p,
  button {
    background-color: ${({ theme }) => theme.themeColors.secondBackground};
    ${({ theme }) => theme.loadingAnimation()};
  }

  button {
    background-color: ${({ theme }) => theme.themeColors.border};
    border: none;
  }

  h2 {
    height: 28px;
    width: 100%;
    margin: 0 0 4px 0;

    &::after {
      display: none;
    }
  }

  button {
    height: 21px;
    width: 100px;
    margin-bottom: 16px;
  }

  ${({ theme }) => theme.mq.tablet} {
    padding: 30px;

    h2 {
      width: 50%;
    }
  }

  ${({ theme }) => theme.mq.desktop} {
    padding: 50px;
  }
`;

export const Days = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 16px;

  p {
    width: 100%;
    height: 30px;
    background-color: ${({ theme }) => theme.themeColors.border} !important;
  }

  ${({ theme }) => theme.mq.tablet} {
    margin-bottom: 24px;

    p {
      height: 36px;
    }
  }
`;
