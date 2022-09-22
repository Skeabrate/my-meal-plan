import React from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import { fetchCategories } from 'hooks/useFetchCategories';
import { CategoryType } from 'types/CategoryType';
import { dehydrate, QueryClient } from 'react-query';
import { fetchMealsByCategory, useFetchMealsByCategory } from 'hooks/useFetchMealsByCategory';
import Link from 'next/link';

const Category = ({ category }: { category: string }) => {
  const { data } = useFetchMealsByCategory(category);

  return (
    <main>
      <header>
        <h1>{category}</h1>
      </header>

      <section>
        {data.map(({ idMeal, strMeal, strMealThumb }) => (
          <article key={idMeal}>
            <Link href={`/meal/${strMeal}`}>
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

  await queryClient.prefetchQuery('categories', fetchCategories);
  await queryClient.prefetchQuery('mealsByCategory', () =>
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
