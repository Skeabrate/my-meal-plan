import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import { fetchCategories, useFetchCategories } from 'hooks/useFetchCategories';
import { CategoryType } from 'types/CategoryType';
import { dehydrate, QueryClient } from 'react-query';
import { fetchMealsByCategory, useFetchMealsByCategory } from 'hooks/useFetchMealsByCategory';

const Category = ({ category }: { category: string }) => {
  const { categories } = useFetchCategories();
  const { mealsByCategory } = useFetchMealsByCategory(category);

  const categoryDetails = useMemo(
    () => categories.find((item) => item.strCategory === category),
    [categories, category]
  );

  return (
    <main>
      <header>
        <h1>{categoryDetails?.strCategory}</h1>

        <p>{categoryDetails?.strCategoryDescription}</p>
      </header>

      <section>
        {mealsByCategory.map(({ idMeal, strMeal, strMealThumb }) => (
          <article key={idMeal}>
            <Link href={`/meal/${idMeal}`}>
              <a>
                <Image
                  src={strMealThumb}
                  alt={strMeal}
                  width='300'
                  height='300'
                />
                <h2>{strMeal}</h2>
              </a>
            </Link>
          </article>
        ))}
      </section>
    </main>
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
