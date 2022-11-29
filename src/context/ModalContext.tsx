import React, { useCallback, useMemo, useState } from 'react';
import { usePathChange } from 'hooks/usePathChange';
import InfoModal from 'components/InfoModal/InfoModal';

type ModalContextType = {
  modal: ModalType;
  openModal: (state: ModalType['state'], message: string) => void;
  closeModal: () => void;
};

export type ModalType = {
  isOpen: boolean;
  state: 'success' | 'error';
  message: string;
};

export const ModalContext = React.createContext({} as ModalContextType);

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalType>({
    isOpen: false,
    state: 'error',
    message: '',
  });

  const closeModal = useCallback(() => {
    setModal((state) => ({
      ...state,
      message: '',
      isOpen: false,
    }));
  }, []);

  const openModal = useCallback(
    (state: ModalType['state'], message: string) => {
      const closeModalHandler = () =>
        new Promise((resolve, reject) => {
          closeModal();
          resolve(true);
        });

      const openModalHandler = () =>
        new Promise(() => {
          setModal({
            isOpen: true,
            state,
            message,
          });
        });

      closeModalHandler().then(() => openModalHandler());
    },
    [closeModal]
  );

  usePathChange(closeModal);

  const value = useMemo(
    () => ({
      modal,
      openModal,
      closeModal,
    }),
    [modal, openModal, closeModal]
  );

  return (
    <ModalContext.Provider value={value}>
      {modal.isOpen && <InfoModal />}
      {children}
    </ModalContext.Provider>
  );
}
