import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import * as Styled from 'assets/styles/meal.styles';
import { fetchCategories } from 'api/useFetchCategories';
import { dehydrate, QueryClient } from 'react-query';
import { fetchMealById, useFetchMealById } from 'api/useFetchMealById';
import { useGetMealDetails } from 'hooks/useGetMealDetails';
import FavoritesButton from 'components/FavoritesButton/FavoritesButton';

const Meal = ({ mealId }: { mealId: string }) => {
  const { mealById } = useFetchMealById(mealId);
  const { id, name, category, area, imgUrl, youtubeUrl, instructions, ingredients } =
    useGetMealDetails(mealById[0]);

  const detailsList = useMemo(
    () => [
      {
        label: 'Instruction:',
        data: instructions,
      },
      {
        label: 'Ingredients:',
        data: ingredients,
      },
    ],
    [ingredients, instructions]
  );

  const [activeDetails, setActiveDetails] = useState<
    { id: number; firstValue: string; secondValue: string }[]
  >([]);

  useEffect(() => {
    setActiveDetails(detailsList[0].data);
  }, [detailsList]);

  return (
    <div>
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
          <div>
            <Image
              src={imgUrl}
              alt={name}
              layout='fill'
              objectFit='cover'
            />

            <FavoritesButton mealId={id} />
          </div>

          <iframe
            title={name}
            width='100%'
            height='250px'
            src={`https://www.youtube.com/embed/${youtubeUrl}`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </Styled.Gallery>

        <Styled.DetailsWrapper>
          <Styled.DetailsBar>
            {detailsList.map(({ label, data }) => (
              <Styled.SwitchDetailsButton
                key={label}
                onClick={() => setActiveDetails(data)}
                $isActive={activeDetails === data}
              >
                {label}
              </Styled.SwitchDetailsButton>
            ))}
          </Styled.DetailsBar>

          <Styled.Details $areIngredientsActive={activeDetails === ingredients}>
            {activeDetails.map(({ id, firstValue, secondValue }) => (
              <p key={id}>
                <span>{firstValue}</span> {secondValue}
              </p>
            ))}
          </Styled.Details>
        </Styled.DetailsWrapper>
      </Styled.MealGrid>
    </div>
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
