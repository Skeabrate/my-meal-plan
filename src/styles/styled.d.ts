import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blue: string;
      green: string;
      orange: string;
      lightOrange: string;
      grey: string;
      lightGrey: string;
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
  }
}
