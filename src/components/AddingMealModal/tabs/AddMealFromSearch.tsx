import React, { useContext } from 'react';
import * as Styled from '../AddingMealModal.styles';
import { AddingMealModalContext } from 'context/AddingMealModalContext';
import ErrorBoundary from 'templates/ErrorBoundary';
import AddingMealsGrid from '../AddingMealsGrid/AddingMealsGrid';

const AddMealFromSearch = ({
  createMealInMealsSectionHandler,
}: {
  createMealInMealsSectionHandler: (body: {}) => void;
}) => {
  const { mealsSectionId } = useContext(AddingMealModalContext);

  return (
    <ErrorBoundary
      isLoading={false}
      loadingHeight={50}
      isError={false}
      error={false}
    >
      {[]?.length ? (
        <AddingMealsGrid
          meals={[]}
          createMealInMealsSectionHandler={createMealInMealsSectionHandler}
        />
      ) : (
        <p>Meals not found.</p>
      )}
    </ErrorBoundary>
  );
};

export default AddMealFromSearch;
