import React from 'react';
import ThemeProvider from 'context/ThemeContext';

const MountWithProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default MountWithProviders;
