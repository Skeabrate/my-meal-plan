import 'styled-components';

export interface ThemeVariant {
  themeColors: {
    background: string;
    secondBackground: string;
    font: string;
    secondFont: string;
    border: string;
  };
  boxShadow: (color: string) => FlattenSimpleInterpolation;
}

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeVariant {
    colors: {
      green: string;
      orange: string;
      red: string;
    };
    fontFamily: {
      abril: string;
      lato: string;
    };
    fontSize: {
      headingDesktop: string;
      headingMobile: string;
      abrilDesktop: string;
      paragraph: string;
      caption: string;
    };
    mq: {
      tablet: string;
      desktop: string;
      bigDesktop: string;
      huge: string;
    };
    fadeInAnimation: (duration?: number) => FlattenSimpleInterpolation;
    slideInAnimation: (duration?: number) => FlattenSimpleInterpolation;
    loadingAnimation: () => FlattenSimpleInterpolation;
  }
}
