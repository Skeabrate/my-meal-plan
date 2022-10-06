import React, { useMemo } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';

type FavoriteItem = string;

type FavoritesContextType = {
  favorites: FavoriteItem[];
  favoritesLength: number;
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
};

export const FavoritesContext = React.createContext({} as FavoritesContextType);

export default function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, favoritesLength, setFavorites] = useLocalStorage('favorites', []);

  const value = useMemo(
    () => ({
      favorites,
      favoritesLength,
      setFavorites,
    }),
    [favorites, favoritesLength, setFavorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
