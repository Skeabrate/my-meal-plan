import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme/theme';
import { render } from '@testing-library/react';

export const renderWithProviders = (children: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};
