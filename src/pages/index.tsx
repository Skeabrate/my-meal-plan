import type { NextPage } from 'next';
import Head from 'next/head';
import { dehydrate, QueryClient } from 'react-query';
import { useFetchCategories, fetchCategories } from 'hooks/useFetchCategories';

const Home: NextPage = () => {
  const { data, isLoading, error } = useFetchCategories();

  return (
    <div>
      <Head>
        <title>My Meal Plan</title>
        <meta name='description' content='Meal Plan app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>My plan</h1>
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
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('categories', fetchCategories);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
