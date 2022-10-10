import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T | (() => T)) => {
  const [state, setState] = useState<T>(() => {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue) {
      return JSON.parse(localStorageValue);
    } else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return { state, setState };
};
