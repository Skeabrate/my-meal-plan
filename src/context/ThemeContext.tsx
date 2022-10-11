import React, { useCallback, useMemo } from 'react';
import { ThemeProvider as ThemeStyledComponentsProvider } from 'styled-components';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { theme, themeVariants } from 'assets/styles/theme/theme';
import { GlobaStyles } from 'assets/styles/theme/GlobalStyle';
import { ThemeVariantsType } from 'assets/styles/theme/styled';

type ThemeContextType = {
  switchThemeStyle: () => void;
};

enum ThemeTypes {
  Light = 'light',
  Dark = 'dark',
}

export const ThemeContext = React.createContext({} as ThemeContextType);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { state: themeStyle, setState: setThemeStyle } = useLocalStorage('theme', ThemeTypes.Light);

  const switchThemeStyle = useCallback(() => {
    setThemeStyle((state) =>
      state === ThemeTypes.Light
        ? ThemeTypes.Dark
        : state === ThemeTypes.Dark
        ? ThemeTypes.Light
        : state
    );
  }, [setThemeStyle]);

  const getNewTheme = (themeType: { colors: {}; boxShadow: Function }) => ({
    ...theme,
    colors: { ...theme.colors, ...themeType.colors },
    boxShadow: themeType.boxShadow,
  });

  const value = useMemo(
    () => ({
      switchThemeStyle,
    }),
    [switchThemeStyle]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeStyledComponentsProvider
        theme={getNewTheme(themeVariants[themeStyle as keyof ThemeVariantsType])}
      >
        <GlobaStyles />
        {children}
      </ThemeStyledComponentsProvider>
    </ThemeContext.Provider>
  );
}
