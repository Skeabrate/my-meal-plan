import React from 'react';
import dynamic from 'next/dynamic';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { PageProps } from 'types/PagePropsType';
import SearchBarProvider from 'context/SearchBarContext';
import ResizeWindowProvider from 'context/ResizeWindowContext';

const FavoritesProvider = dynamic(() => import('context/FavoritesContext'), { ssr: false });
const ThemeWrapper = dynamic(() => import('./ThemeWrapper'), { ssr: false });

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
        <ThemeWrapper>
          <ResizeWindowProvider>
            <FavoritesProvider>
              <SearchBarProvider>{children}</SearchBarProvider>
            </FavoritesProvider>
          </ResizeWindowProvider>
        </ThemeWrapper>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default ProvidersWrapper;
