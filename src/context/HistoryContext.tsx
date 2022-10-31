import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';

type HistoryContextType = {
  goBack: () => void;
};

export const HistoryContext = React.createContext({} as HistoryContextType);

export default function HistoryProvider({ children }: { children: React.ReactNode }) {
  const { asPath, push, pathname } = useRouter();
  const [history, setHistory] = useState<string[]>([]);

  const goBack = useCallback(() => {
    for (let i = history.length - 2; i >= 0; i--) {
      const route = history[i];

      if (!route.includes('#') && route !== pathname) {
        push(route);
        const newHistory = history.slice(0, i);
        setHistory(newHistory);
        return;
      }
    }

    push('/');
  }, [history, pathname, push]);

  const value = useMemo(() => ({ goBack }), [goBack]);

  useEffect(() => {
    // dont include skeleton loaders
    if (!asPath.includes('/loading/')) setHistory((previous) => [...previous, asPath]);
  }, [asPath]);

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}
