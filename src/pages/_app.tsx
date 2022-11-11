import { Fragment } from 'react';
import { ExtendedAppProps, PageProps } from 'types/PagePropsType';
import PageWrapper from 'templates/PageWrapper';
import ProvidersWrapper from 'templates/ProvidersWrapper';
import SearchBarWrapper from 'components/SearchBar/SearchBarWrapper';
import HeadComponent from 'components/HeadComponent/HeadComponent';
import NavBar from 'components/NavBar/NavBar';
import Footer from 'components/Footer/Footer';

function MyApp({ Component, pageProps }: ExtendedAppProps<PageProps>) {
  const Layout = Component.Layout ?? Fragment;

  return (
    <ProvidersWrapper pageProps={pageProps}>
      <SearchBarWrapper />
      <HeadComponent />
      <NavBar />
      <PageWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PageWrapper>
      <Footer />
    </ProvidersWrapper>
  );
}

export default MyApp;
