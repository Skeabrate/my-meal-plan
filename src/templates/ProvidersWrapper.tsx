import React from 'react';
import dynamic from 'next/dynamic';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { PageProps } from 'types/PagePropsType';
import { SessionProvider } from 'next-auth/react';
import SearchBarProvider from 'context/SearchBarContext';
import ResizeWindowProvider from 'context/ResizeWindowContext';
import HistoryProvider from 'context/HistoryContext';
import AlertModalProvider from 'context/AlertModalContext';
import AddingMealModalProvider from 'context/AddingMealModalContext';
const FavoritesProvider = dynamic(() => import('context/FavoritesContext'), { ssr: false });
const ThemeProvider = dynamic(() => import('context/ThemeContext'), { ssr: false });

const ProvidersWrapper = ({
  children,
  pageProps: { session, ...pageProps },
}: {
  children: React.ReactNode;
  pageProps: PageProps;
}) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider>
            <HistoryProvider>
              <ResizeWindowProvider>
                <FavoritesProvider>
                  <AlertModalProvider>
                    <AddingMealModalProvider>
                      <SearchBarProvider>{children}</SearchBarProvider>
                    </AddingMealModalProvider>
                  </AlertModalProvider>
                </FavoritesProvider>
              </ResizeWindowProvider>
            </HistoryProvider>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default ProvidersWrapper;
