import { useEffect, useState } from 'react';

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

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [favorites, setFavorites] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue && tryParseJSONObject(localStorageValue)) {
        return JSON.parse(localStorageValue);
      } else return initialValue;
    } else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(favorites));
  }, [key, favorites]);

  return [favorites, setFavorites] as [typeof favorites, typeof setFavorites];
}
