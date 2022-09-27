import React, { useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import { fetchCategories } from 'hooks/useFetchCategories';
import { dehydrate, QueryClient } from 'react-query';
import { fetchMealById, useFetchMealById } from 'hooks/useFetchMealById';

const Meal = ({ mealId }: { mealId: string }) => {
  const { mealById } = useFetchMealById(mealId);

  const getIngredients = useMemo(
    () =>
      Object.entries(mealById[0]).reduce((acc, [key, value]) => {
        if (key.includes('strIngredient') && value?.trim()) {
          acc.push({ id: key.split('strIngredient')[1], name: value });
        }
        if (key.includes('strMeasure') && value?.trim()) {
          const index = +key.split('strMeasure')[1];
          acc[index - 1].value = value;
        }

        return acc;
      }, [] as any),
    [mealById]
  );

  const mealDetails = {
    name: mealById[0].strMeal,
    category: mealById[0].strCategory,
    instructions: mealById[0].strInstructions.split('.').filter((item) => item),
    area: mealById[0].strArea,
    imgUrl: mealById[0].strMealThumb,
    youtubeUrl: mealById[0].strYoutube,
    ingredients: getIngredients,
  };

  return (
    <>
      <section>
        <header>
          <h1>{mealDetails.name}</h1>
        </header>

        <article>
          {mealDetails.instructions.map((item, index) => (
            <div key={index}>
              <h3>Step {index + 1}</h3>
              <p>{item}.</p>
            </div>
          ))}
        </article>
      </section>
    </>
  );
};

export async function getServerSideProps(context: { params: { meal: string } }) {
  const queryClient = new QueryClient();

  const mealId = context.params.meal;

  await queryClient.prefetchQuery('fetchCategories', fetchCategories);
  await queryClient.prefetchQuery('fetchMealById', () => fetchMealById(mealId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      mealId,
    },
  };
}

export default Meal as NextPage;
