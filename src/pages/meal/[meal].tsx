import React, { useMemo } from 'react';
import Image from 'next/image';
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
          acc.push({ id: key.split('strIngredient')[1], name: value, measure: '' });
        }
        if (key.includes('strMeasure') && value?.trim()) {
          const index = +key.split('strMeasure')[1];
          acc[index - 1].measure = value;
        }

        return acc;
      }, [] as { id: string; name: string; measure: string }[]),
    [mealById]
  );

  const getInstructions = useMemo(
    () => mealById[0].strInstructions.split('.').filter((item) => item),
    [mealById]
  );

  const mealDetails = {
    name: mealById[0].strMeal,
    category: mealById[0].strCategory,
    area: mealById[0].strArea,
    imgUrl: mealById[0].strMealThumb,
    youtubeUrl: mealById[0].strYoutube,
    instructions: getInstructions,
    ingredients: getIngredients,
  };

  return (
    <section>
      <header>
        <h1>{mealDetails.name}</h1>
      </header>

      <p>Category: {mealDetails.category}</p>
      <p>Area: {mealDetails.area}</p>
      <Image
        src={mealDetails.imgUrl}
        alt={mealDetails.name}
        width={500}
        height={500}
        object-fit='contain'
      />

      <article>
        <h2>Ingredients:</h2>

        {mealDetails.ingredients.map(({ id, name, measure }) => (
          <div
            key={id}
            style={{ marginBottom: '10px' }}
          >
            <p>Name: {name}</p>
            <p>Measure: {measure}</p>
          </div>
        ))}
      </article>

      <article>
        <h2>Instruction:</h2>
        {mealDetails.instructions.map((item, index) => (
          <div key={item}>
            <h3>Step {index + 1}</h3>
            <p>{item}.</p>
          </div>
        ))}
      </article>
    </section>
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
