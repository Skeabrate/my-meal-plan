import React, { useCallback, useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { fetchCategories } from 'hooks/useFetchCategories';
import { FavoritesContext } from 'context/FavoritesContext';
import { fetchFavoriteMealsById } from 'utils/fetchFavoriteMealsById';
import { MealType } from 'types/MealType';
import GridSection from 'components/GridSection/GridSection';

function Favorites() {
  const [favoritesDetails, setFavoritesDetails] = useState<MealType[]>([]);
  const [loading, setLoading] = useState(false);

  const { favorites } = useContext(FavoritesContext);

  const getFavoritesMeals = useCallback(async (meals: string[]) => {
    setLoading(true);
    const mealsById = (await fetchFavoriteMealsById(meals)).filter((item) => item.idMeal);
    setFavoritesDetails(mealsById);
    setLoading(false);
  }, []);

  useEffect(() => {
    getFavoritesMeals(favorites);
  }, [favorites, getFavoritesMeals]);

  return (
    <GridSection
      data={favoritesDetails.map(({ idMeal, strMeal, strMealThumb }) => ({
        id: idMeal,
        name: strMeal,
        img: strMealThumb,
        slug: idMeal,
      }))}
      linkUrl='meal'
      label={{ value: 'Favorites:', isMain: true }}
      enableFavorites
      loadingData={loading}
      error={{
        value: !favoritesDetails.length,
        fallbackMessage: `You don't have any favorites yet.`,
      }}
    />
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

export default Favorites as NextPage;
