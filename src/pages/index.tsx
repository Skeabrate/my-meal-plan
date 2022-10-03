import type { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { fetchCategories, useFetchCategories } from 'hooks/useFetchCategories';
import GridSection from 'components/GridSection/GridSection';

function Home() {
  const { categories, isLoading, error } = useFetchCategories();

  return (
    <>
      <GridSection
        data={categories?.map(({ idCategory, strCategory, strCategoryThumb }) => ({
          id: idCategory,
          name: strCategory,
          img: strCategoryThumb,
          slug: strCategory,
        }))}
        linkUrl='category'
        label={{ value: 'Categories:', isMain: true }}
        loadingData={isLoading}
        error={{
          value: error,
          fallbackMessage: `We couldn't load any categories.`,
        }}
      />
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
