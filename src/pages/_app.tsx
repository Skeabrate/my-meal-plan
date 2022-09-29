import React from 'react';
import { NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider, DehydratedState } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { GlobaStyles } from 'styles/GlobalStyle';
import SearchBarProvider from 'context/SearchBarContext';
import ResizeWindowProvider from 'context/ResizeWindowContext';
import MainWrapper from 'templates/MainWrapper';
import NavBar from 'components/NavBar/NavBar';
import HeadComponent from 'components/HeadComponent/HeadComponent';
import Footer from 'components/Footer/Footer';
import SearchBarWrapper from 'components/SearchBar/SearchBarWrapper';

type PageProps = {
  dehydratedState?: DehydratedState;
};

type ExtendedAppProps<P = {}> = {
  err?: NextPageContext['err'];
} & AppProps<P>;

function MyApp({ Component, pageProps }: ExtendedAppProps<PageProps>) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <GlobaStyles />
          <ResizeWindowProvider>
            <SearchBarProvider>
              <SearchBarWrapper />
              <HeadComponent />
              <NavBar />
              <MainWrapper>
                <Component {...pageProps} />
              </MainWrapper>
              <Footer />
            </SearchBarProvider>
          </ResizeWindowProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
