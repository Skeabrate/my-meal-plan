import React from 'react';
import { ExtendedAppProps, PageProps } from 'types/PagePropsType';
import PageWrapper from 'templates/PageWrapper';
import ProvidersWrapper from 'templates/ProvidersWrapper';
import AuthGuard from 'templates/AuthGuard';
import SearchBarWrapper from 'components/SearchBar/SearchBarWrapper';
import HeadComponent from 'components/HeadComponent/HeadComponent';
import NavBar from 'components/NavBar/NavBar';
import Footer from 'components/Footer/Footer';

function MyApp({ Component, pageProps }: ExtendedAppProps<PageProps>) {
  const Layout = Component.Layout ?? React.Fragment;
  const ComponentWithLayout = (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );

  return (
    <ProvidersWrapper pageProps={pageProps}>
      <SearchBarWrapper />
      <HeadComponent />
      <NavBar />
      <PageWrapper>
        {Component.requireAuth ? <AuthGuard>{ComponentWithLayout}</AuthGuard> : ComponentWithLayout}
      </PageWrapper>
      <Footer />
    </ProvidersWrapper>
  );
}

export default MyApp;
