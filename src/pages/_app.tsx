import React from 'react';
import { NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider, DehydratedState } from 'react-query';
import NavBar from 'components/NavBar/NavBar';

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
        <NavBar />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
