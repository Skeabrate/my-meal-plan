import React, { useCallback, useMemo } from 'react';
import { ThemeProvider as ThemeStyledComponentsProvider } from 'styled-components';
import { darkTheme, lightTheme, theme } from 'assets/styles/theme/theme';
import { GlobaStyles } from 'assets/styles/theme/GlobalStyle';
import { useLocalStorage } from 'hooks/useLocalStorage';

type ThemeContextType = {
  switchThemeStyle: () => void;
};

export const ThemeContext = React.createContext({} as ThemeContextType);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { state: themeStyle, setState: setThemeStyle } = useLocalStorage('theme', lightTheme.type);

  const switchThemeStyle = useCallback(() => {
    setThemeStyle((state) =>
      state === darkTheme.type
        ? lightTheme.type
        : state === lightTheme.type
        ? darkTheme.type
        : state
    );
  }, [setThemeStyle]);

  const value = useMemo(
    () => ({
      switchThemeStyle,
    }),
    [switchThemeStyle]
  );

  const themeHandler =
    themeStyle === lightTheme.type
      ? { ...lightTheme, ...theme }
      : themeStyle === darkTheme.type
      ? { ...darkTheme, ...theme }
      : theme;

  return (
    <ThemeContext.Provider value={value}>
      <ThemeStyledComponentsProvider theme={themeHandler}>
        <GlobaStyles />
        {children}
      </ThemeStyledComponentsProvider>
    </ThemeContext.Provider>
  );
}
