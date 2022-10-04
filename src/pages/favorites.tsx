import { useContext } from 'react';
import type { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { fetchCategories } from 'hooks/useFetchCategories';
import { FavoritesContext } from 'context/FavoritesContext';
import GridSection from 'components/GridSection/GridSection';
import { useFetchFavorites } from 'hooks/useFetchFavorites';

function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const { favoritesById, isLoading, error } = useFetchFavorites(favorites);

  return (
    <GridSection
      data={favoritesById?.map(({ idMeal, strMeal, strMealThumb }) => ({
        id: idMeal,
        name: strMeal,
        img: strMealThumb,
        slug: idMeal,
      }))}
      linkUrl='meal'
      label={{ value: 'Favorites:', isMain: true }}
      enableFavorites
      loadingData={isLoading}
      error={{
        value: !favoritesById?.length || error,
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
