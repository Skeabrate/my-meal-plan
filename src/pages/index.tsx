import type { NextPage } from 'next';
import Image from 'next/image';
import * as Styled from 'styles/index.styles';
import { dehydrate, QueryClient } from 'react-query';
import { fetchCategories, useFetchCategories } from 'api/mealdb/useFetchCategories';
import GridSection from 'components/GridSection/GridSection';
import HomepageBaner from 'assets/homepageBaner.jpg';
import Link from 'next/link';

function Home() {
  const { categories, isLoading, isError, error } = useFetchCategories();

  return (
    <>
      <Styled.HeroImage>
        <Styled.HeroInfo>
          <h1>My Meal Plan</h1>
          <p>Save favorite recipies and create your own meal plans!</p>
          <Link href='/profile/meal-plans'>
            <a>
              <span>Try it out</span>
            </a>
          </Link>
        </Styled.HeroInfo>

        <Image
          src={HomepageBaner}
          alt='my-meal-plan'
          objectFit='cover'
        />
      </Styled.HeroImage>

      <div>slider</div>

      <GridSection
        data={categories?.map(({ idCategory, strCategory, strCategoryThumb }) => ({
          id: idCategory,
          name: strCategory,
          img: strCategoryThumb,
          slug: strCategory,
        }))}
        linkUrl='/category/'
        label={{ value: 'Categories:' }}
        loadingData={isLoading}
        error={{
          value: isError,
          fallbackMessage: isError && error ? error : `No categories found.`,
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
