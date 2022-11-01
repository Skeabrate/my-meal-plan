import Link from 'next/link';
import { NextPage } from 'next';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import * as Styled from 'styles/meal.styles';
import { fetchCategories } from 'api/mealdb/useFetchCategories';
import { dehydrate, QueryClient } from 'react-query';
import { fetchMealById, useFetchMealById } from 'api/mealdb/useFetchMealById';
import { useGetMealDetails } from 'hooks/useGetMealDetails';
import FavoritesButton from 'components/FavoritesButton/FavoritesButton';
import MealDetails from 'components/MealDetails/MealDetails';
import Instruction from 'components/MealDetails/tabs/Instruction';
import Ingredients from 'components/MealDetails/tabs/Ingredients';
import Steps from 'components/MealDetails/tabs/Steps';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import GoBackButton from 'components/GoBackButton/GoBackButton';

const Meal = ({ mealId }: { mealId: string }) => {
  const { mealById } = useFetchMealById(mealId);
  const { id, name, category, area, imgUrl, youtubeUrl, instructions, steps, ingredients } =
    useGetMealDetails(mealById[0]);

  return (
    <>
      <GoBackButton />

      <Styled.Header>
        <h1>{name}</h1>

        <div>
          <p>
            Category:
            <span>
              <Link href={`/category/${category}`}>{category}</Link>
            </span>
          </p>
          <p>
            Area: <span>{area}</span>
          </p>
        </div>
      </Styled.Header>

      <Styled.MealGrid>
        <Styled.Gallery>
          <ImageLoading>
            <Image
              src={imgUrl}
              alt={name}
              layout={'fill'}
              objectFit={'cover'}
            />
            <FavoritesButton mealId={id} />
          </ImageLoading>

          <iframe
            title={name}
            src={youtubeUrl}
            width='100%'
            height='250px'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </Styled.Gallery>

        <MealDetails
          tabs={[
            {
              label: 'Ingredients',
              Component: <Ingredients ingredients={ingredients} />,
            },
            {
              label: 'Cooking',
              Component: <Steps steps={steps} />,
            },
            {
              label: 'Instruction',
              Component: <Instruction instruction={instructions} />,
            },
          ]}
        />
      </Styled.MealGrid>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  const mealId = context.params?.meal;

  await queryClient.prefetchQuery('fetchCategories', fetchCategories);
  await queryClient.prefetchQuery(['fetchMealById', mealId], () => fetchMealById(mealId as string));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      mealId,
    },
  };
}

export default Meal as NextPage;
