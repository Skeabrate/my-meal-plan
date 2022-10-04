import { useEffect, useState } from 'react';
import { fetchFavorites } from 'api/useFetchFavorites';

function tryParseJSONObject(jsonString: string) {
  try {
    var val = JSON.parse(jsonString);
    if (val && typeof val === 'object' && Array.isArray(val)) {
      return val;
    }
  } catch (err) {
    console.log(err);
  }

  return false;
}

export function useLocalStorage(key: string, initialValue: string[]) {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue && tryParseJSONObject(localStorageValue)) {
        return JSON.parse(localStorageValue);
      } else return initialValue;
    } else return initialValue;
  });
  const [favoritesLength, setFavoritesLength] = useState(0);

  const validateLocalStorage = async () => {
    const check = await fetchFavorites(favorites);
    setFavorites(
      check.reduce((acc, item) => {
        if (item.idMeal) acc.push(item.idMeal);
        return acc;
      }, [] as string[])
    );
  };

  useEffect(() => {
    validateLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(favorites));
    setFavoritesLength(favorites.length);
  }, [key, favorites]);

  return [favorites, favoritesLength, setFavorites] as [
    typeof favorites,
    typeof favoritesLength,
    typeof setFavorites
  ];
}
