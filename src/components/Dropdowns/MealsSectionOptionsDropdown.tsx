import { useContext } from 'react';
import Link from 'next/link';
import { SearchBarContext } from 'context/SearchBarContext';
import Dropdown from './template/Dropdown';
import SearchSVG from 'assets/SVG/Search.svg';
import FavoritesSVG from 'assets/SVG/Marked.svg';
import PlusSVG from 'assets/SVG/Plus.svg';

const OptionsDropdown = ({ deleteHandler }: { deleteHandler: () => void }) => {
  const { toggleSearchBar } = useContext(SearchBarContext);

  return (
    <Dropdown>
      <li>
        <button onClick={toggleSearchBar}>
          <SearchSVG />
          <span>Search for a meal</span>
        </button>
      </li>
      <li>
        <Link href='/favorites'>
          <a>
            <FavoritesSVG />
            <span>Add from favorites</span>
          </a>
        </Link>
      </li>
      <li>
        <button onClick={deleteHandler}>
          <PlusSVG />
          <span>Delete meal section</span>
        </button>
      </li>
    </Dropdown>
  );
};

export default OptionsDropdown;
