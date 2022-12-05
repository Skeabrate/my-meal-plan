import { useContext } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import * as Styled from 'styles/favorites.styles';
import { dehydrate, QueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import { fetchCategories } from 'api/mealdb/useFetchCategories';
import { useFetchFavorites } from 'api/mealdb/useFetchFavorites';
import { FavoritesContext } from 'context/FavoritesContext';
import { ROUTES } from 'utils/routes';
import GridSection from 'components/GridSection/GridSection';
import GoBackButton from 'components/GoBackButton/GoBackButton';

function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const { favoritesById, isLoading, isError, error } = useFetchFavorites(favorites);
  const { data: session } = useSession();

  return (
    <>
      <GoBackButton />

      <GridSection
        data={favoritesById?.map(({ idMeal, strMeal, strMealThumb }) => ({
          id: idMeal,
          name: strMeal,
          img: strMealThumb,
          slug: idMeal,
        }))}
        linkUrl={ROUTES.meal}
        label={{ value: 'Favorites:', isMain: true }}
        enableObtionsButton
        loadingData={isLoading}
        error={{
          value: isError || !favoritesById?.length,
          fallbackMessage: isError && error ? error : `You don't have favorite meals yet.`,
        }}
      />

      {session ? null : (
        <Styled.SignIn>
          <p>
            Don't lose your favorites list.
            <span>Sign in to store your favorites list across multiple devices.</span>
          </p>

          <Link href={ROUTES.profile.signIn}>Sign in</Link>
        </Styled.SignIn>
      )}
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

export default Favorites as NextPage;
