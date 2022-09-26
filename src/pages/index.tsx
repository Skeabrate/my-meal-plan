import type { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { fetchCategories, useFetchCategories } from 'hooks/useFetchCategories';
import GridSection from 'components/GridSection/GridSection';

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
        <GridSection
          data={categories.map(({ idCategory, strCategory, strCategoryThumb }) => ({
            id: idCategory,
            name: strCategory,
            img: strCategoryThumb,
            slug: strCategory,
          }))}
          linkUrl='category'
        />
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
