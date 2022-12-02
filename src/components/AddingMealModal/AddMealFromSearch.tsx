import React, { useContext } from 'react';
import { AddingMealModalContext } from 'context/AddingMealModalContext';

const AddMealFromSearch = ({
  createMealInMealsSectionHandler,
}: {
  createMealInMealsSectionHandler: (body: {}) => void;
}) => {
  const { mealsSectionId } = useContext(AddingMealModalContext);

  return (
    <div>
      <p>Search for meal</p>
    </div>
  );
};

export default AddMealFromSearch;
