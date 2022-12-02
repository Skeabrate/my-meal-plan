import React, { useContext } from 'react';
import { useMutation } from 'hooks/useMutation';
import { AlertModalContext } from 'context/AlertModalContext';
import { AddingMealModalContext } from 'context/AddingMealModalContext';
import AddMealFromSearch from './AddMealFromSearch';
import AddMealFromFavorites from './AddMealFromFavorites';
import { useTabs } from 'hooks/useTabs';

const AddingMealModal = () => {
  const { closeModalHandler } = useContext(AddingMealModalContext);
  const { openAlertModal } = useContext(AlertModalContext);

  const { mutation: createMealInMealsSection, isLoading } = useMutation(
    '/api/createMealInMealsSection',
    () => {},
    (err) => {
      openAlertModal('error', err);
    }
  );

  const tabs: { id: 'search' | 'favorites'; label: string; Component: React.ReactNode }[] = [
    {
      id: 'search',
      label: 'Search',
      Component: <AddMealFromSearch />,
    },
    {
      id: 'favorites',
      label: 'Favorites',
      Component: <AddMealFromFavorites />,
    },
  ];
  const { activeDetails, selectedTab, setActiveDetails } = useTabs(tabs);

  return (
    <div>
      <button onClick={closeModalHandler}>close</button>

      <div>
        <button onClick={() => setActiveDetails('search')}>Search</button>
        <button onClick={() => setActiveDetails('favorites')}>Favorites</button>
      </div>

      <h3>Modal</h3>
      {selectedTab}
    </div>
  );
};

export default AddingMealModal;
