import { css, DefaultTheme, keyframes } from 'styled-components';
import { ThemeVariant } from './styled';

const lightThemeBackground = 'hsl(0, 0%, 100%)';
const darkThemeBackground = '	hsl(180, 2%, 20%)';

export const themeVariants: { light: ThemeVariant; dark: ThemeVariant } = {
  light: {
    themeColors: {
      background: lightThemeBackground,
      secondBackground: '	hsl(0, 0%, 94%)',
      font: 'hsl(0, 0%, 0%)',
      secondFont: 'hsl(234, 11%, 39%)',
      border: 'hsl(0, 0%, 85%)',
    },
    boxShadow: (color: string) => css`
      box-shadow: 0 0 0 1px ${lightThemeBackground}, 0 0 0 2px ${color};
    `,
  },
  dark: {
    themeColors: {
      background: darkThemeBackground,
      secondBackground: 'hsl(180, 2%, 16%)',
      font: '	hsl(0, 0%, 100%)',
      secondFont: 'hsl(180, 2%, 76%)',
      border: 'hsl(180, 2%, 28%)',
    },
    boxShadow: (color: string) => css`
      box-shadow: 0 0 0 1px ${darkThemeBackground}, 0 0 0 2px ${color};
    `,
  },
};

export const theme: DefaultTheme = {
  ...themeVariants.light,
  colors: {
    green: 'hsl(161, 66%, 38%)',
    orange: 'hsl(22, 100%, 52%)',
    red: 'hsl(3, 100%, 36%)',
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
