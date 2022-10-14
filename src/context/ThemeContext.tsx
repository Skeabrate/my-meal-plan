import React, { useMemo } from 'react';
import { ThemeProvider as ThemeStyledComponentsProvider } from 'styled-components';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { theme, themeVariants } from 'assets/styles/theme/theme';
import { GlobaStyles } from 'assets/styles/theme/GlobalStyle';
import { ThemeVariantsType } from 'assets/styles/theme/styled';

export enum ThemeTypes {
  Light = 'light',
  Dark = 'dark',
}

type ThemeContextType = {
  themeStyle: ThemeTypes;
  setThemeStyle: React.Dispatch<React.SetStateAction<ThemeTypes>>;
};

export const ThemeContext = React.createContext({} as ThemeContextType);

export const isSystemThemeSettingSetToDark =
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const initialThemeBasedOnSystemSettings = isSystemThemeSettingSetToDark
    ? ThemeTypes.Dark
    : ThemeTypes.Light;

  const { state: themeStyle, setState: setThemeStyle } = useLocalStorage(
    'theme',
    initialThemeBasedOnSystemSettings
  );

  const getNewTheme = useMemo(() => {
    const getThemeVariant = themeVariants[themeStyle as keyof ThemeVariantsType];
    return {
      ...theme,
      colors: { ...theme.colors, ...getThemeVariant.colors },
      boxShadow: getThemeVariant.boxShadow,
    };
  }, [themeStyle]);

  const value = useMemo(
    () => ({
      themeStyle,
      setThemeStyle,
    }),
    [themeStyle, setThemeStyle]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeStyledComponentsProvider theme={getNewTheme}>
        <GlobaStyles />
        {children}
      </ThemeStyledComponentsProvider>
    </ThemeContext.Provider>
  );
}
