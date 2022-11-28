import { ModalContext } from 'context/ModalContext';
import React, { useContext, useEffect } from 'react';

const InfoModal = () => {
  const { modal, closeModal } = useContext(ModalContext);

  useEffect(() => {
    let timeout = setTimeout(() => {
      closeModal();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [closeModal]);

  return <div>{modal.message}</div>;
};

export default InfoModal;
