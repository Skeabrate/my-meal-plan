import React, { useMemo, useState } from 'react';
import { usePathChange } from 'hooks/usePathChange';
import AddingMealModal from 'components/AddingMealModal/AddingMealModal';

type AddingMealModalContext = {
  mealsSectionId: string;
  closeModalHandler: () => void;
  openModalHandler: (mealsSectionId: string) => void;
};

export const AddingMealModalContext = React.createContext({} as AddingMealModalContext);

export default function AddingMealModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState({
    isOpen: false,
    mealsSectionId: '',
  });

  const closeModalHandler = () => {
    setModal({
      isOpen: false,
      mealsSectionId: '',
    });
  };

  const openModalHandler = (mealsSectionId: string) => {
    setModal({
      isOpen: true,
      mealsSectionId,
    });
  };

  usePathChange(closeModalHandler);

  const value = useMemo(
    () => ({
      mealsSectionId: modal.mealsSectionId,
      closeModalHandler,
      openModalHandler,
    }),
    [modal.mealsSectionId]
  );

  return (
    <AddingMealModalContext.Provider value={value}>
      {!modal.isOpen && <AddingMealModal />}
      {children}
    </AddingMealModalContext.Provider>
  );
}
