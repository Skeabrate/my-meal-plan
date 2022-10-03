import React, { useCallback, useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { fetchCategories } from 'hooks/useFetchCategories';
import { FavoritesContext } from 'context/FavoritesContext';
import { fetchFavoriteMealsById } from 'utils/fetchFavoriteMealsById';
import { MealType } from 'types/MealType';

function Favorites() {
  const [favoritesDetails, setFavoritesDetails] = useState<MealType[]>([]);
  const [loading, setLoading] = useState(true);

  const { favorites } = useContext(FavoritesContext);

  const getFavoritesMeals = useCallback(async (meals: string[]) => {
    const mealsById = (await fetchFavoriteMealsById(meals)).filter((item) => item.idMeal);
    setFavoritesDetails(mealsById);
    setLoading(false);
  }, []);

  useEffect(() => {
    getFavoritesMeals(favorites);
  }, [favorites, getFavoritesMeals]);

  return (
    <div>
      <h1>Favorites</h1>

      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {favoritesDetails.map((item) => (
            <div key={item.idMeal}>{item.strMeal}</div>
          ))}
        </div>
      )}
    </div>
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
