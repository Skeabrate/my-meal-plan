import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { dehydrate, QueryClient } from 'react-query';
import * as Styled from 'assets/styles/index.styles';
import { fetchCategories, useFetchCategories } from 'hooks/useFetchCategories';

function Home() {
  const { categories, error } = useFetchCategories();

  return (
    <>
      <h1>Available categories:</h1>

      {error ? (
        <div style={{ paddingTop: '30px' }}>
          <h2>Sorry we couldn't find any categories.</h2>
        </div>
      ) : (
        <Styled.Categories>
          {categories?.map(({ idCategory, strCategory, strCategoryThumb }) => (
            <article key={idCategory}>
              <Link href={`/category/${strCategory}`}>
                <a>
                  <Image
                    src={strCategoryThumb}
                    alt={strCategory}
                    width={240}
                    height={240}
                    objectFit='contain'
                  />

                  <h2>{strCategory}</h2>
                </a>
              </Link>
            </article>
          ))}
        </Styled.Categories>
      )}
    </>
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
