import React, { useMemo } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import * as Styled from 'assets/styles/category.styles';
import { fetchCategories, useFetchCategories } from 'hooks/useFetchCategories';
import { CategoryType } from 'types/CategoryType';
import { dehydrate, QueryClient } from 'react-query';
import { fetchMealsByCategory, useFetchMealsByCategory } from 'hooks/useFetchMealsByCategory';
import GridSection from 'components/GridSection/GridSection';

const Category = ({ category }: { category: string }) => {
  const { categories } = useFetchCategories();
  const { mealsByCategory } = useFetchMealsByCategory(category);

  const categoryDetails = useMemo(
    () => categories.find((item) => item.strCategory === category),
    [categories, category]
  );

  if (!categoryDetails) return;
  const { strCategory, strCategoryDescription, strCategoryThumb } = categoryDetails;

  return (
    <>
      <Styled.Intro>
        <article>
          <header>
            <h1>{strCategory}</h1>
          </header>

          <p>{strCategoryDescription}</p>
        </article>

        <Image
          src={strCategoryThumb}
          alt={strCategory}
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
        label='Meals:'
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

  await queryClient.prefetchQuery('fetchCategories', fetchCategories);
  await queryClient.prefetchQuery('fetchMealsByCategory', () =>
    fetchMealsByCategory(context.params.category)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      category: context.params.category,
    },
  };
}

export default Category as NextPage;
