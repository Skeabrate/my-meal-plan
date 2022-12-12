import React, { useMemo } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { theme, themeVariants } from 'styles/theme/theme';
import { GlobaStyles } from 'styles/theme/GlobalStyle';

export enum ThemeTypes {
  Light = 'light',
  Dark = 'dark',
}

type ThemeContextType = {
  themeStyle: ThemeTypes;
  setThemeStyle: React.Dispatch<React.SetStateAction<ThemeTypes>>;
};

export const isSystemThemeSettingSetToDark =
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const ThemeContext = React.createContext({} as ThemeContextType);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const initialTheme = ThemeTypes.Light;

  const { state: themeStyle, setState: setThemeStyle } = useLocalStorage('theme', initialTheme);

  const getNewTheme = useMemo(
    () => ({
      ...theme,
      ...themeVariants[themeStyle],
    }),
    [themeStyle]
  );

  const value = useMemo(
    () => ({
      themeStyle,
      setThemeStyle,
    }),
    [themeStyle, setThemeStyle]
  );

  return (
    <ThemeContext.Provider value={value}>
      <StyledComponentsThemeProvider theme={getNewTheme}>
        <GlobaStyles />
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
}
