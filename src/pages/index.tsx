import type { NextPage } from 'next';
import Head from 'next/head';
import { dehydrate, QueryClient } from 'react-query';
import { fetchCategories } from 'hooks/useFetchCategories';

function Home() {
  return (
    <div>
      <Head>
        <title>My Meal Plan</title>
        <meta
          name='description'
          content='Meal Plan app'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>

      <main style={{ height: '200vh' }}>
        {/* <section>
          {isLoading ? <p>Loading...</p> : null}
          {error ? <p>Error</p> : null}
          {data?.map(({ idCategory, strCategory, strCategoryThumb }) => (
            <article key={idCategory}>{strCategory}</article>
          ))}
        </section> */}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('fetchCategories', fetchCategories);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home as NextPage;
