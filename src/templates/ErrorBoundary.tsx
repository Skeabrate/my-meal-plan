import React, { useContext, useEffect } from 'react';
import { ModalContext } from 'context/ModalContext';
import Loading from 'components/Loading/Loading';
import styled from 'styled-components';

const StyledError = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;

const ErrorBoundary = ({
  isLoading,
  loadingHeight,
  isError,
  error,
  children,
}: {
  isLoading: boolean;
  loadingHeight?: number;
  isError: boolean;
  error: unknown;
  children: React.ReactNode;
}) => {
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    if (isError) openModal('error', 'An error has occurred.');
  }, [isError, openModal]);

  if (isLoading) {
    return <Loading height={loadingHeight} />;
  }

  if (isError) {
    return <StyledError>{typeof error === 'string' ? error : 'An error has occured.'}</StyledError>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
