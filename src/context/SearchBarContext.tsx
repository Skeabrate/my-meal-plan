import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { disablePageScroll } from 'utils/disablePageScroll';

type SearchBarContextType = {
  isSearchBarOpen: boolean;
  toggleSearchBar: () => void;
};

export const SearchBarContext = React.createContext({} as SearchBarContextType);

export default function SearchBarProvider({ children }: { children: ReactNode }) {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const toggleSearchBar = useCallback(
    () =>
      setIsSearchBarOpen((state) => {
        window.matchMedia('(min-width: 768px)').matches && disablePageScroll(!state);
        return !state;
      }),
    []
  );

  const value = useMemo(
    () => ({
      isSearchBarOpen,
      toggleSearchBar,
    }),
    [isSearchBarOpen, toggleSearchBar]
  );

  return <SearchBarContext.Provider value={value}>{children}</SearchBarContext.Provider>;
}
