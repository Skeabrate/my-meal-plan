import React, { useContext } from 'react';
import { FavoritesContext } from 'context/FavoritesContext';
import { useFetchFavorites } from 'api/mealdb/useFetchFavorites';
import ErrorBoundary from 'templates/ErrorBoundary';
import AddingMealsGrid from '../AddingMealsGrid/AddingMealsGrid';

const AddMealFromFavorites = ({
  createMealInMealsSectionHandler,
}: {
  createMealInMealsSectionHandler: (body: {}) => void;
}) => {
  const { favorites } = useContext(FavoritesContext);
  const { favoritesById, isLoading, isError, error } = useFetchFavorites(favorites);

  return (
    <ErrorBoundary
      isLoading={isLoading}
      loadingHeight={50}
      isError={isError}
      error={error}
    >
      {favoritesById?.length ? (
        <AddingMealsGrid
          meals={favoritesById}
          createMealInMealsSectionHandler={createMealInMealsSectionHandler}
        />
      ) : (
        <p>You don't have any favorite meals yet.</p>
      )}
    </ErrorBoundary>
  );
};

export default AddMealFromFavorites;
