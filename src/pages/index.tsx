import type { NextPage } from 'next';
import Head from 'next/head';
import { dehydrate, QueryClient } from 'react-query';
import { fetchCategories, useFetchCategories } from 'hooks/useFetchCategories';
import Image from 'next/image';
import Link from 'next/link';

function Home() {
  const { categories, error } = useFetchCategories();

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
        <h1>Available categories:</h1>

        {error ? (
          <div>
            <h2>Sorry we couldn't find any categories</h2>
          </div>
        ) : (
          <section>
            {categories?.map(({ idCategory, strCategory, strCategoryThumb }) => (
              <Link
                href={`/category/${strCategory}`}
                key={idCategory}
              >
                <a>
                  <article>
                    <header>
                      <h2>{strCategory}</h2>
                    </header>

                    <Image
                      src={strCategoryThumb}
                      alt={strCategory}
                      width={300}
                      height={300}
                    />
                  </article>
                </a>
              </Link>
            ))}
          </section>
        )}
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
