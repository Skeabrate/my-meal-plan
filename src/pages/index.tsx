import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import * as Styled from 'styles/index.styles';
import { dehydrate, QueryClient } from 'react-query';
import { fetchCategories, useFetchCategories } from 'api/mealdb/useFetchCategories';
import { ROUTES } from 'utils/routes';
import { TypeAnimation } from 'react-type-animation';
import HomepageBaner from 'assets/homepageBaner.jpg';
import GridSection from 'components/GridSection/GridSection';
import ReviewsSlider from 'components/ReviewsSlider/ReviewsSlider';

function Home() {
  const { categories, isLoading, isError, error } = useFetchCategories();

  return (
    <>
      <Styled.HeroImage>
        <Styled.HeroInfo>
          <h1>My Meal Plan</h1>
          <TypeAnimation
            sequence={['Save favorite recipies', 2000, 'Create meal plans!', 2000]}
            wrapper='div'
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: '2.2rem' }}
          />
          <Link href={ROUTES.profile.mealPlans}>
            <a>
              <span>Try it out</span>
            </a>
          </Link>
        </Styled.HeroInfo>

        <Image
          src={HomepageBaner}
          alt='my-meal-plan baner'
          objectFit='cover'
          placeholder='blur'
          priority
        />
      </Styled.HeroImage>

      <ReviewsSlider />

      <GridSection
        data={categories?.map(({ idCategory, strCategory, strCategoryThumb }) => ({
          id: idCategory,
          name: strCategory,
          img: strCategoryThumb,
          slug: strCategory,
        }))}
        linkUrl={`${ROUTES.category}/`}
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
