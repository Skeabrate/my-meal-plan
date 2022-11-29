import InfoModal from 'components/InfoModal/InfoModal';
import { usePathChange } from 'hooks/usePathChange';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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

  const openModal = useCallback((state: ModalType['state'], message: string) => {
    setModal({
      isOpen: true,
      state,
      message,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModal((state) => ({
      ...state,
      message: '',
      isOpen: false,
    }));
  }, []);

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
