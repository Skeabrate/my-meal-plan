import React, { useMemo, useState } from 'react';

type FavoritesContextType = {
  favorites: string[];
  setFavorites: Function;
};

export const FavoritesContext = React.createContext({} as FavoritesContextType);

export default function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState([]);

  const value = useMemo(
    () => ({
      favorites,
      setFavorites,
    }),
    [favorites, setFavorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
