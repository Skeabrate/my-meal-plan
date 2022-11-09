import React, { useContext, useMemo } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';

type FavoriteItem = string;

type FavoritesContextType = {
  favorites: FavoriteItem[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
};

export const FavoritesContext = React.createContext({} as FavoritesContextType);

export default function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { state: favorites, setState: setFavorites } = useLocalStorage<FavoriteItem[]>(
    'favorites',
    []
  );

  const value = useMemo(
    () => ({
      favorites,
      setFavorites,
    }),
    [favorites, setFavorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export const useFavorites = (mealId: string) => {
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const isMealAlreadyFavorite = useMemo(
    () => favorites.some((item) => item === mealId),
    [favorites, mealId]
  );

  const handleFavorites = () => {
    if (isMealAlreadyFavorite) {
      setFavorites((state) => state.filter((item) => item !== mealId));
    } else {
      setFavorites((state) => [...state, mealId]);
    }
  };

  return { isMealAlreadyFavorite, handleFavorites };
};
