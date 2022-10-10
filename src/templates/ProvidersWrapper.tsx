import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { PageProps } from 'types/PagePropsType';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme/theme';
import { GlobaStyles } from 'assets/styles/theme/GlobalStyle';
import SearchBarProvider from 'context/SearchBarContext';
import ResizeWindowProvider from 'context/ResizeWindowContext';
import FavoritesProvider from 'context/FavoritesContext';

const ProvidersWrapper = ({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: PageProps;
}) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <GlobaStyles />
          <ResizeWindowProvider>
            <FavoritesProvider>
              <SearchBarProvider>{children}</SearchBarProvider>
            </FavoritesProvider>
          </ResizeWindowProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default ProvidersWrapper;
