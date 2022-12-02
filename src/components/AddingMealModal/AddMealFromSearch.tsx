import React, { useContext } from 'react';
import { AddingMealModalContext } from 'context/AddingMealModalContext';

const AddMealFromSearch = () => {
  const { mealsSectionId } = useContext(AddingMealModalContext);

  return (
    <div>
      <p>Add meal from search</p>
    </div>
  );
};

export default AddMealFromSearch;
