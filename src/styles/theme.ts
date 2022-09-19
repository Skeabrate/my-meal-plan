import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    blue: '#585A6D',
    green: '#21A179',
    orange: '#C44900',
    grey: '#d8d8d8 ',
    lightGrey: '#F0F0F0',
  },
  fontFamily: {
    abril: '"Abril Fatface", cursive',
    lato: '"Lato", sans-serif',
  },
  fontSize: {
    paragraph: '1.6rem',
    caption: '1.2rem',
  },
  mq: {
    tablet: '@media (min-width: 768px)',
    desktop: '@media (min-width: 1024px)',
    bigDesktop: '@media (min-width: 1280px)',
    huge: '@media (min-width: 1440px)',
  },
};
