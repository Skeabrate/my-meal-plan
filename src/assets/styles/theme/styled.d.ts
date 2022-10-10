import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
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

export interface ColorsType {
  type: string;
  colors: {
    blue: string;
    green: string;
    orange: string;
    grey: string;
    lightGrey: string;
  };
}
