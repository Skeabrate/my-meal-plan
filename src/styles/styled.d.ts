import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blue: string;
      green: string;
      orange: string;
      grey: string;
      lightGrey: string;
    };
    fontFamily: {
      abril: string;
      lato: string;
    };
    fontSize: {
      h1Desktop: string;
      h1Mobile: string;
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
