import { useMemo } from 'react';
import Image from 'next/image';
import { GetStaticPropsContext, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import * as Styled from 'styles/category.styles';
import { fetchCategories, useFetchCategories } from 'api/mealdb/useFetchCategories';
import { fetchMealsByCategory, useFetchMealsByCategory } from 'api/mealdb/useFetchMealsByCategory';
import { CategoryType } from 'types/CategoryType';
import { ROUTES } from 'utils/routes';
import GridSection from 'components/GridSection/GridSection';
import GoBackButton from 'components/GoBackButton/GoBackButton';

const Category = ({ category }: { category: string }) => {
  const { categories, isLoading, isError, error } = useFetchCategories();
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
        linkUrl={ROUTES.meal}
        label={{ value: 'Meals:' }}
        enableOptionsButton
        loadingData={isLoading}
        error={{
          value: isError,
          fallbackMessage: isError && error ? error : `No meals found.`,
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
