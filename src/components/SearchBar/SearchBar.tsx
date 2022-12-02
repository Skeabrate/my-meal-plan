import { useState, useContext } from 'react';
import * as Styled from './SearchBar.styles';
import CloseSvg from 'assets/SVG/Close.svg';
import { SearchBarContext } from 'context/SearchBarContext';
import Results from './Results/Results';
import ModalBackground from 'components/ModalBackground/ModalBackground';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { isSearchBarOpen, toggleSearchBar } = useContext(SearchBarContext);

  return (
    <Styled.SearchBar $isSearchBarOpen={isSearchBarOpen}>
      <ModalBackground actionHandler={toggleSearchBar} />

      <Styled.SearchBarInner>
        <Styled.InputWrapper>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type='text'
            placeholder='Search...'
            autoFocus
          />
          <button onClick={toggleSearchBar}>
            <CloseSvg />
          </button>
        </Styled.InputWrapper>

        <Results inputValue={inputValue} />
      </Styled.SearchBarInner>
    </Styled.SearchBar>
  );
};

export default SearchBar;
