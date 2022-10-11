import { css, DefaultTheme, keyframes } from 'styled-components';
import { ThemeVariantsType } from './styled';

const lightThemeBackground = '#FFFFFF';
const darkThemeBackground = '#323434';

export const themeVariants: ThemeVariantsType = {
  light: {
    colors: {
      background: lightThemeBackground,
      secondBackground: '#F0F0F0',
      font: '#000000',
      secondFont: '#585A6D',
      border: '#d8d8d8',
    },
    boxShadow: (color: string) => css`
      box-shadow: 0 0 0 1px ${lightThemeBackground}, 0 0 0 2px ${color};
    `,
  },
  dark: {
    colors: {
      background: darkThemeBackground,
      secondBackground: '#282A2A',
      font: '#FFFFFF',
      secondFont: '#C1C3C3',
      border: '#464949',
    },
    boxShadow: (color: string) => css`
      box-shadow: 0 0 0 1px ${darkThemeBackground}, 0 0 0 2px ${color};
    `,
  },
};

export const theme: DefaultTheme = {
  colors: {
    background: '',
    secondBackground: '',
    font: '',
    secondFont: '',
    border: '',
    green: '#21A179',
    orange: '#FF640A',
    red: '#B70A01',
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
  boxShadow: () => {},
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
  loadingAnimation: () => {
    const loadingAnimation = keyframes`
			from {
				opacity: 0.4;
			} to {
				opacity: 1;
			}
		`;

    return css`
      animation: ${loadingAnimation} 0.6s linear infinite alternate;
    `;
  },
};
