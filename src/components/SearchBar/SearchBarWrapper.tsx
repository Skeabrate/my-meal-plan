import { useContext } from 'react';
import { SearchBarContext } from 'context/SearchBarContext';
import { usePathChange } from 'hooks/usePathChange';
import SearchBar from './SearchBar';

// To achieve unmount effect on searchbar - without putting conditional renderings in app.tsx
const SearchBarWrapper = () => {
  const { isSearchBarOpen, toggleSearchBar } = useContext(SearchBarContext);

  usePathChange(isSearchBarOpen ? toggleSearchBar : () => {});

  return isSearchBarOpen ? <SearchBar /> : null;
};

export default SearchBarWrapper;
