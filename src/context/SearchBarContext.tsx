import React, { ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { disablePageScroll } from 'utils/disablePageScroll';
import { usePathChange } from 'hooks/usePathChange';
import SearchBar from 'components/SearchBar/SearchBar';
import { AlertModalContext } from './AlertModalContext';

type SearchBarContextType = {
  isSearchBarOpen: boolean;
  toggleSearchBar: () => void;
};

export const SearchBarContext = React.createContext({} as SearchBarContextType);

export default function SearchBarProvider({ children }: { children: ReactNode }) {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const { closeAlertModal } = useContext(AlertModalContext);

  const toggleSearchBar = useCallback(() => {
    setIsSearchBarOpen((state) => {
      window.matchMedia('(min-width: 768px)').matches && disablePageScroll(!state);
      return !state;
    });

    closeAlertModal();
  }, [closeAlertModal]);

  usePathChange(isSearchBarOpen ? toggleSearchBar : () => {});

  const value = useMemo(
    () => ({
      isSearchBarOpen,
      toggleSearchBar,
    }),
    [isSearchBarOpen, toggleSearchBar]
  );

  return (
    <SearchBarContext.Provider value={value}>
      {isSearchBarOpen && <SearchBar />}
      {children}
    </SearchBarContext.Provider>
  );
}
