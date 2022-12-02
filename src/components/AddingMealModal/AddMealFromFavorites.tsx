import React, { useContext } from 'react';
import { AddingMealModalContext } from 'context/AddingMealModalContext';
import { FavoritesContext } from 'context/FavoritesContext';
import { useFetchFavorites } from 'api/mealdb/useFetchFavorites';

const AddMealFromFavorites = ({
  createMealInMealsSectionHandler,
}: {
  createMealInMealsSectionHandler: (body: {}) => void;
}) => {
  const { mealsSectionId } = useContext(AddingMealModalContext);
  const { favorites } = useContext(FavoritesContext);

  const { favoritesById, isLoading, isError, error } = useFetchFavorites(favorites);

  return (
    <div>
      <p>Meals</p>
    </div>
  );
};

export default AddMealFromFavorites;
