import Link from 'next/link';
import { NextPage } from 'next';
import * as Styled from 'assets/styles/meal.styles';
import { fetchCategories } from 'api/useFetchCategories';
import { dehydrate, QueryClient } from 'react-query';
import { fetchMealById, useFetchMealById } from 'api/useFetchMealById';
import { useGetMealDetails } from 'hooks/useGetMealDetails';
import FavoritesButton from 'components/FavoritesButton/FavoritesButton';
import MealDetails from 'components/MealDetails/MealDetails';
import Instruction from 'components/MealDetails/tabs/Instruction';
import Ingredients from 'components/MealDetails/tabs/Ingredients';
import Steps from 'components/MealDetails/tabs/Steps';
import ImageLoading from 'components/ImageLoading/ImageLoading';

const Meal = ({ mealId }: { mealId: string }) => {
  const { mealById } = useFetchMealById(mealId);
  const { id, name, category, area, imgUrl, youtubeUrl, instructions, steps, ingredients } =
    useGetMealDetails(mealById[0]);

  return (
    <>
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
          <ImageLoading
            options={{
              src: imgUrl,
              alt: name,
              layout: 'fill',
              objectFit: 'cover',
            }}
          >
            <FavoritesButton mealId={id} />
          </ImageLoading>

          <iframe
            title={name}
            width='100%'
            height='250px'
            src={`https://www.youtube.com/embed/${youtubeUrl}`}
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

export async function getServerSideProps(context: { params: { meal: string } }) {
  const queryClient = new QueryClient();

  const mealId = context.params.meal;

  await queryClient.prefetchQuery('fetchCategories', fetchCategories);
  await queryClient.prefetchQuery(['fetchMealById', mealId], () => fetchMealById(mealId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      mealId,
    },
  };
}

export default Meal as NextPage;
