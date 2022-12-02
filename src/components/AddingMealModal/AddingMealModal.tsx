import React, { useContext } from 'react';
import * as Styled from './AddingMealModal.styles';
import { AlertModalContext } from 'context/AlertModalContext';
import { AddingMealModalContext } from 'context/AddingMealModalContext';
import { useMutation } from 'hooks/useMutation';
import { useTabs } from 'hooks/useTabs';
import PlusSvg from 'assets/SVG/Plus.svg';
import FavoritesSvg from 'assets/SVG/Marked.svg';
import SearchSvg from 'assets/SVG/Search.svg';
import ModalBackground from 'components/ModalBackground/ModalBackground';
import Loading from 'components/Loading/Loading';
import AddMealFromSearch from './tabs/AddMealFromSearch';
import AddMealFromFavorites from './tabs/AddMealFromFavorites';

export const MEAL_ADDED_SUCCESSFULLY = 'Meal added successfully.';

const AddingMealModal = () => {
  const { closeAddingMealModalHandler } = useContext(AddingMealModalContext);
  const { openAlertModal } = useContext(AlertModalContext);

  const { mutation: createMealInMealsSection, isLoading: isLoadingCreateMeal } = useMutation(
    '/api/createMealInMealsSection',
    () => {
      openAlertModal('success', MEAL_ADDED_SUCCESSFULLY);
      closeAddingMealModalHandler();
    },
    (err) => {
      openAlertModal('error', err.response?.data);
    }
  );

  const tabs: { id: 'search' | 'favorites'; label: string; Component: React.ReactNode }[] = [
    {
      id: 'favorites',
      label: 'Favorites',
      Component: (
        <AddMealFromFavorites createMealInMealsSectionHandler={createMealInMealsSection} />
      ),
    },
    {
      id: 'search',
      label: 'Search',
      Component: <AddMealFromSearch createMealInMealsSectionHandler={createMealInMealsSection} />,
    },
  ];
  const { activeDetails, selectedTab, setActiveDetails } = useTabs(tabs);

  return (
    <Styled.AddingMealModal>
      <ModalBackground actionHandler={closeAddingMealModalHandler} />

      <Styled.InnerWrapper>
        <Styled.TabsSwitch>
          <Styled.TabsSwitchButton
            $isActive={activeDetails === 'favorites'}
            onClick={() => setActiveDetails('favorites')}
          >
            <FavoritesSvg />
            Favorites
          </Styled.TabsSwitchButton>
          <Styled.TabsSwitchButton
            $isActive={activeDetails === 'search'}
            onClick={() => setActiveDetails('search')}
          >
            <SearchSvg />
            Search
          </Styled.TabsSwitchButton>
        </Styled.TabsSwitch>

        <Styled.Header>
          <h2>
            {activeDetails === 'favorites'
              ? 'Add meal from Favorites'
              : activeDetails === 'search'
              ? 'Search for meal'
              : ''}
          </h2>

          <button onClick={closeAddingMealModalHandler}>
            <PlusSvg />
          </button>
        </Styled.Header>

        {isLoadingCreateMeal ? (
          <Styled.LoadingWrapper>
            <Loading height={50} />
          </Styled.LoadingWrapper>
        ) : (
          selectedTab
        )}
      </Styled.InnerWrapper>
    </Styled.AddingMealModal>
  );
};

export default AddingMealModal;
