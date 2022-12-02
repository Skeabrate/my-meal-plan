import React, { useMemo, useState } from 'react';
import { usePathChange } from 'hooks/usePathChange';
import AddingMealModal from 'components/AddingMealModal/AddingMealModal';

type AddingMealModalContext = {
  mealsSectionId: string;
  closeAddingMealModalHandler: () => void;
  openAddingMealModalHandler: (mealsSectionId: string) => void;
};

export const AddingMealModalContext = React.createContext({} as AddingMealModalContext);

export default function AddingMealModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState({
    isOpen: false,
    mealsSectionId: '',
  });

  const closeAddingMealModalHandler = () => {
    setModal({
      isOpen: false,
      mealsSectionId: '',
    });
  };

  const openAddingMealModalHandler = (mealsSectionId: string) => {
    setModal({
      isOpen: true,
      mealsSectionId,
    });
  };

  usePathChange(closeAddingMealModalHandler);

  const value = useMemo(
    () => ({
      mealsSectionId: modal.mealsSectionId,
      closeAddingMealModalHandler,
      openAddingMealModalHandler,
    }),
    [modal.mealsSectionId]
  );

  return (
    <AddingMealModalContext.Provider value={value}>
      {modal.isOpen && <AddingMealModal />}
      {children}
    </AddingMealModalContext.Provider>
  );
}
