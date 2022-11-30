import React, { useContext, useEffect } from 'react';
import { ModalContext } from 'context/ModalContext';
import * as Styled from './InfoModal.styles';

export const useInfoModal = (errors: { isError: boolean; error: unknown }[]) => {
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    errors.forEach(({ isError, error }) => {
      if (isError) {
        openModal('error', error);
      }
    });
  }, [errors, openModal]);
};

const InfoModal = () => {
  const { modal, closeModal } = useContext(ModalContext);

  useEffect(() => {
    let timeout = setTimeout(() => {
      closeModal();
    }, 3200);

    return () => clearTimeout(timeout);
  }, [closeModal]);

  return (
    <Styled.InfoModal $state={modal.state}>
      {modal.message}
      <Styled.LoadingBar $state={modal.state}>
        <span></span>
      </Styled.LoadingBar>
    </Styled.InfoModal>
  );
};

export default InfoModal;
