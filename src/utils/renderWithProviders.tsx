import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ThemeProvider from 'context/ThemeContext';

export const renderWithProviders = (children: React.ReactNode) => {
  return render(<ThemeProvider>{children}</ThemeProvider>);
};
