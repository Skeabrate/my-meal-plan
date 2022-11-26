import { useMemo } from 'react';
import Image from 'next/image';
import { GetStaticPropsContext, NextPage } from 'next';
import * as Styled from 'styles/category.styles';
import { fetchCategories, useFetchCategories } from 'api/mealdb/useFetchCategories';
import { CategoryType } from 'types/CategoryType';
import { dehydrate, QueryClient } from 'react-query';
import { fetchMealsByCategory, useFetchMealsByCategory } from 'api/mealdb/useFetchMealsByCategory';
import GridSection from 'components/GridSection/GridSection';
import GoBackButton from 'components/GoBackButton/GoBackButton';

const Category = ({ category }: { category: string }) => {
  const { categories, isLoading, error } = useFetchCategories();
  const { mealsByCategory } = useFetchMealsByCategory(category);

  const categoryDetails = useMemo(
    () => categories?.find((item) => item.strCategory === category),
    [categories, category]
  );

  return (
    <>
      <GoBackButton />

      <Styled.Intro>
        <article>
          <header>
            <h1>{categoryDetails?.strCategory}</h1>
          </header>

          <p>{categoryDetails?.strCategoryDescription}</p>
        </article>

        <Image
          src={categoryDetails?.strCategoryThumb || ''}
          alt={categoryDetails?.strCategory}
          width='280'
          height='280'
          objectFit='contain'
        />
      </Styled.Intro>

      <GridSection
        data={mealsByCategory?.map(({ idMeal, strMeal, strMealThumb }) => ({
          id: idMeal,
          name: strMeal,
          img: strMealThumb,
          slug: idMeal,
        }))}
        linkUrl='/loading/meal?id='
        label={{ value: 'Meals:' }}
        enableFavorites
        loadingData={isLoading}
        error={{
          value: error,
          fallbackMessage: `No meals found.`,
        }}
      />
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetchCategories();

  const paths = res.map((item: CategoryType) => ({
    params: {
      category: item.strCategory,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const queryClient = new QueryClient();

  const category = context.params?.category;

  await queryClient.prefetchQuery('fetchCategories', fetchCategories);
  await queryClient.prefetchQuery(['fetchMealsByCategory', category], () =>
    fetchMealsByCategory(category as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      category,
    },
  };
}

export default Category as NextPage;
