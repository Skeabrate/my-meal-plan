import { css, DefaultTheme, keyframes } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    blue: '#585A6D',
    green: '#21A179',
    orange: '#C44900',
    lightOrange: '#FF711F',
    grey: '#d8d8d8',
    lightGrey: '#F0F0F0',
  },
  fontFamily: {
    abril: '"Abril Fatface", cursive',
    lato: '"Lato", sans-serif',
  },
  fontSize: {
    headingDesktop: '5rem',
    headingMobile: '3rem',
    abrilDesktop: '2rem',
    paragraph: '1.6rem',
    caption: '1.2rem',
  },
  mq: {
    tablet: '@media (min-width: 768px)',
    desktop: '@media (min-width: 1024px)',
    bigDesktop: '@media (min-width: 1280px)',
    huge: '@media (min-width: 1440px)',
  },
  boxShadow: (color: string) => css`
    box-shadow: 0 0 0 1px white, 0 0 0 2px ${color};
  `,
  fadeInAnimation: (duration = 0.6) => {
    const fadeInAnimation = keyframes`
			from {
				opacity: 0;
				transform: translateY(-10px);
			} to{
				opacity: 1;
				transform: translateY(0);
			}
		`;

    return css`
      animation: ${fadeInAnimation} ${duration}s forwards;
    `;
  },

  slideInAnimation: (duration = 0.6) => {
    const SlideInAnimation = keyframes`
			from{
				opacity: 0;
				transform: translateX(-10px);
			} to {
				opacity: 1;
				transform: translateX(0);
			}
		`;

    return css`
      animation: ${SlideInAnimation} ${duration}s forwards;
    `;
  },
};
