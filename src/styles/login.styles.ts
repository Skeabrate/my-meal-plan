import styled from 'styled-components';

export const Login = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 90%;
  text-align: center;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};

  h1 {
    background-color: ${({ theme }) => theme.colors.green};
    color: white;
    width: 100%;
    padding-block: 1rem;
    font-weight: 400;
    margin: 0;

    &::after {
      display: none;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    width: 500px;
    min-height: 440px;
    margin-block: 2rem;

    h1 {
      padding-block: 2rem;
    }
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex: 1;

  a,
  button {
    text-decoration: none;
    border: 1px solid ${({ theme }) => theme.themeColors.border};
    background: transparent;
    width: 200px;
    padding-block: 1rem;
    font-size: ${({ theme }) => theme.fontSize.paragraph};
    color: ${({ theme }) => theme.themeColors.secondFont};
    font-weight: 400;
    transition: 0.2s;

    &:hover {
      box-shadow: ${({ theme }) => theme.colors.boxShadow};
    }
  }

  p {
    color: ${({ theme }) => theme.themeColors.secondFont};
    position: relative;
    width: fit-content;
    margin: 0 auto;

    &::after,
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 80px;
      height: 1px;
      background-color: ${({ theme }) => theme.themeColors.border};
    }

    &::after {
      left: 30px;
    }

    &::before {
      right: 30px;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    gap: 3rem;

    a,
    button {
      width: 240px;
      padding-block: 2rem;
    }
  }
`;
