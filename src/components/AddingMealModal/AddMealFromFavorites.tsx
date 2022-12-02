import React, { useContext } from 'react';
import { AddingMealModalContext } from 'context/AddingMealModalContext';

const AddMealFromFavorites = () => {
  const { mealsSectionId } = useContext(AddingMealModalContext);

  return (
    <div>
      <p>Add meal from favorites</p>
    </div>
  );
};

export default AddMealFromFavorites;
