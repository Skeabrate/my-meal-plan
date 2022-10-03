import React, { useMemo, useState } from 'react';

type FavoriteItem = {
  id: string;
  name: string;
  img: string;
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  setFavorites: Function;
};

export const FavoritesContext = React.createContext({} as FavoritesContextType);

export default function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const value = useMemo(
    () => ({
      favorites,
      setFavorites,
    }),
    [favorites, setFavorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
