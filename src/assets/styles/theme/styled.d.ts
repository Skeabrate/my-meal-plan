import 'styled-components';

export type ThemeVariantsType = {
  light: {
    colors: {};
    boxShadow: Function;
  };
  dark: {
    colors: {};
    boxShadow: Function;
  };
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      secondBackground: string;
      font: string;
      secondFont: string;
      border: string;
      green: string;
      orange: string;
      red: string;
    };
    boxShadow: Function;
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
    boxShadow: Function;
    fadeInAnimation: Function;
    slideInAnimation: Function;
    loadingAnimation: Function;
  }
}
