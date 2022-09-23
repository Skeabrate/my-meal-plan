import React from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import { fetchCategories } from 'hooks/useFetchCategories';
import { dehydrate, QueryClient } from 'react-query';
import { fetchMealById, useFetchMealById } from 'hooks/useFetchMealById';

const Meal = ({ mealId }: { mealId: string }) => {
  const { data } = useFetchMealById(mealId);
  const {
    strMeal,
    strInstructions,
    strCategory,
    strArea,
    strMealThumb,
    strYoutube,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
    strMeasure16,
    strMeasure17,
    strMeasure18,
    strMeasure19,
    strMeasure20,
  } = data[0];

  return (
    <main>
      <header>
        <h1>{strMeal}</h1>
      </header>
    </main>
  );
};

export async function getServerSideProps(context: { params: { meal: string } }) {
  const queryClient = new QueryClient();

  const mealId = context.params.meal;

  await queryClient.prefetchQuery('categories', fetchCategories);
  await queryClient.prefetchQuery('mealById', () => fetchMealById(mealId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      mealId,
    },
  };
}

export default Meal as NextPage;
