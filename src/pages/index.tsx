import type { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { fetchCategories, useFetchCategories } from 'api/mealdb/useFetchCategories';
import GridSection from 'components/GridSection/GridSection';

function Home() {
  const { categories, isLoading, isError, error } = useFetchCategories();
  console.log(isError, error);
  return (
    <GridSection
      data={categories?.map(({ idCategory, strCategory, strCategoryThumb }) => ({
        id: idCategory,
        name: strCategory,
        img: strCategoryThumb,
        slug: strCategory,
      }))}
      linkUrl='/category/'
      label={{ value: 'Categories:', isMain: true }}
      loadingData={isLoading}
      error={{
        value: isError,
        fallbackMessage: isError ? error : `No categories found.`,
      }}
    />
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
