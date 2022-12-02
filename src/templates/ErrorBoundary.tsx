import React, { useContext, useEffect } from 'react';
import { AlertModalContext } from 'context/AlertModalContext';
import Loading from 'components/Loading/Loading';
import styled from 'styled-components';

const StyledError = styled.p`
  font-weight: 600;
  font-style: italic;
`;

const StyledLoading = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const { openAlertModal } = useContext(AlertModalContext);

  useEffect(() => {
    if (isError) openAlertModal('error', 'An error has occurred.');
  }, [isError, openAlertModal]);

  if (isLoading) {
    return (
      <StyledLoading>
        <Loading height={loadingHeight} />
      </StyledLoading>
    );
  }

  if (isError) {
    return <StyledError>{typeof error === 'string' ? error : 'An error has occured.'}</StyledError>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
