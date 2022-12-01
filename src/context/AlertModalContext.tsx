import React, { useCallback, useMemo, useState } from 'react';
import { usePathChange } from 'hooks/usePathChange';
import InfoModal from 'components/AlertModal/AlertModal';

type AlertModalContextType = {
  alertModal: AlertModalType;
  openAlertModal: (state: AlertModalType['state'], message: unknown) => void;
  closeAlertModal: () => void;
};

export type AlertModalType = {
  isOpen: boolean;
  state: 'success' | 'error';
  message: string;
};

export const AlertModalContext = React.createContext({} as AlertModalContextType);

export default function AlertModalProvider({ children }: { children: React.ReactNode }) {
  const [alertModal, setAlertModal] = useState<AlertModalType>({
    isOpen: false,
    state: 'error',
    message: '',
  });

  const closeAlertModal = useCallback(() => {
    setAlertModal((state) => ({
      ...state,
      message: '',
      isOpen: false,
    }));
  }, []);

  const openAlertModal = useCallback(
    (state: AlertModalType['state'], message: unknown) => {
      const closeAlertModalHandler = () =>
        new Promise((resolve, reject) => {
          closeAlertModal();
          resolve(true);
        });

      const openAlertModalHandler = () =>
        new Promise(() => {
          setAlertModal({
            isOpen: true,
            state,
            message: message && typeof message === 'string' ? message : 'An error has occured.',
          });
        });

      closeAlertModalHandler().then(() => openAlertModalHandler());
    },
    [closeAlertModal]
  );

  usePathChange(closeAlertModal);

  const value = useMemo(
    () => ({
      alertModal,
      openAlertModal,
      closeAlertModal,
    }),
    [alertModal, openAlertModal, closeAlertModal]
  );

  return (
    <AlertModalContext.Provider value={value}>
      {alertModal.isOpen && <InfoModal />}
      {children}
    </AlertModalContext.Provider>
  );
}
