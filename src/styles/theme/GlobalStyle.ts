import { createGlobalStyle, keyframes } from 'styled-components';

// to achive proper formating
const styled = { createGlobalStyle, keyframes };

const scaleAnimation = styled.keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

export const GlobaStyles = styled.createGlobalStyle`
  *,
  *::after,
  *::before {
    -webkit-font-smothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily.lato};
    font-size: ${({ theme }) => theme.fontSize.paragraph};
    background-color: ${({ theme }) => theme.themeColors.background};
    color: ${({ theme }) => theme.themeColors.font};

    svg path {
      fill: ${({ theme }) => theme.themeColors.font};
    }

    button,
    a {
      cursor: pointer;
      color: ${({ theme }) => theme.themeColors.font};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: ${({ theme }) => theme.fontFamily.abril};
      font-style: italic;
    }

    h1,
    h2 {
      font-size: ${({ theme }) => theme.fontSize.headingMobile};
      margin-bottom: 3rem;
      position: relative;
      width: fit-content;
      line-height: 1.2;
      z-index: 1;

      &:after {
        content: '';
        position: absolute;
        width: 60%;
        height: 4px;
        background-color: ${({ theme }) => theme.colors.orange};
        left: 0;
        bottom: -4px;
        z-index: -1;
        ${({ theme }) => theme.boxShadow(theme.colors.orange)};
        transform: scaleX(0);
        transform-origin: 0 0;
        animation: ${scaleAnimation} 0.6s forwards;
      }
    }

    h3,
    h4,
    h5,
    h6 {
      font-size: 2.2rem;
      font-weight: 400;
    }

    *::selection {
      background-color: ${({ theme }) => theme.colors.red};
      color: hsl(0, 0%, 100%);
    }

    ${({ theme }) => theme.mq.tablet} {
      h1,
      h2 {
        font-size: ${({ theme }) => theme.fontSize.headingDesktop};
        margin-bottom: 6rem;

        &:after {
          height: 5px;
        }
      }
    }
  }

  * {
    ::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.themeColors.background};
    }
    ::-webkit-scrollbar {
      width: 14px;
      height: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.themeColors.border};
      border-radius: 100px;
      border: 3px solid ${({ theme }) => theme.themeColors.background};
      background-clip: padding-box;

      &:active {
        background-color: ${({ theme }) => theme.themeColors.secondBackground};
      }
    }
  }

  // prevent focusing inputs on mobile devices
  input[type='color'],
  input[type='date'],
  input[type='datetime'],
  input[type='datetime-local'],
  input[type='email'],
  input[type='month'],
  input[type='number'],
  input[type='password'],
  input[type='search'],
  input[type='tel'],
  input[type='text'],
  input[type='time'],
  input[type='url'],
  input[type='week'],
  select:focus,
  textarea {
    font-size: 16px;
    color: ${({ theme }) => theme.themeColors.font};
  }

  input:focus {
    outline: none;
    ${({ theme }) => theme.boxShadow(theme.colors.orange)}
  }
`;
