import React, { useMemo } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import * as Styled from 'assets/styles/category.styles';
import { fetchCategories, useFetchCategories } from 'api/useFetchCategories';
import { CategoryType } from 'types/CategoryType';
import { dehydrate, QueryClient } from 'react-query';
import { fetchMealsByCategory, useFetchMealsByCategory } from 'api/useFetchMealsByCategory';
import GridSection from 'components/GridSection/GridSection';

const Category = ({ category }: { category: string }) => {
  const { categories, isLoading, error } = useFetchCategories();
  const { mealsByCategory } = useFetchMealsByCategory(category);

  const categoryDetails = useMemo(
    () => categories.find((item) => item.strCategory === category),
    [categories, category]
  );

  return (
    <>
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
        data={mealsByCategory.map(({ idMeal, strMeal, strMealThumb }) => ({
          id: idMeal,
          name: strMeal,
          img: strMealThumb,
          slug: idMeal,
        }))}
        linkUrl='meal'
        label={{ value: 'Meals:' }}
        enableFavorites
        loadingData={isLoading}
        error={{
          value: error,
          fallbackMessage: `We couldn't load any meals.`,
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

export async function getStaticProps(context: { params: { category: string } }) {
  const queryClient = new QueryClient();

  const category = context.params.category;

  await queryClient.prefetchQuery('fetchCategories', fetchCategories);
  await queryClient.prefetchQuery(['fetchMealsByCategory', category], () =>
    fetchMealsByCategory(category)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      category,
    },
  };
}

export default Category as NextPage;
