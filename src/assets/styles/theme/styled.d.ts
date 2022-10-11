import 'styled-components';

export interface ColorsType {
  themeType: string;
  colors: {
    blue: string;
    green: string;
    orange: string;
    grey: string;
    lightGrey: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends ColorsType {
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
