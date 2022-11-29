import { ModalContext } from 'context/ModalContext';
import React, { useContext, useEffect } from 'react';
import * as Styled from './InfoModal.styles';

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
