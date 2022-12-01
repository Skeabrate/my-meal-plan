import React, { useContext, useEffect } from 'react';
import { AlertModalContext } from 'context/AlertModalContext';
import * as Styled from './AlertModal.styles';

export const useAlertModal = (errors: { isError: boolean; error: unknown }[]) => {
  const { openAlertModal } = useContext(AlertModalContext);

  useEffect(() => {
    errors.forEach(({ isError, error }) => {
      if (isError) {
        openAlertModal('error', error);
      }
    });
  }, [errors, openAlertModal]);
};

const AlertModal = () => {
  const { alertModal, closeAlertModal } = useContext(AlertModalContext);

  useEffect(() => {
    let timeout = setTimeout(() => {
      closeAlertModal();
    }, 3200);

    return () => clearTimeout(timeout);
  }, [closeAlertModal]);

  return (
    <Styled.AlertModal $state={alertModal.state}>
      {alertModal.message}
      <Styled.LoadingBar $state={alertModal.state}>
        <span></span>
      </Styled.LoadingBar>
    </Styled.AlertModal>
  );
};

export default AlertModal;
