import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingScreen = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ClipLoader />
    </div>
  );
};

export default LoadingScreen;
