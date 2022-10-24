import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './NavBar.styles';
import LogoSrc from 'assets/logo.png';
import ProfileSvg from 'assets/SVG/Profile.svg';
import SearchSvg from 'assets/SVG/Search.svg';
import CategoriesBar from './CategoriesBar/CategoriesBar';
import { ResizeWindowContext } from 'context/ResizeWindowContext';
import { SearchBarContext } from 'context/SearchBarContext';
import { FavoritesContext } from 'context/FavoritesContext';
import { disablePageScroll } from 'utils/disablePageScroll';
import { usePathChange } from 'hooks/usePathChange';
import ThemeDropdown from 'components/Dropdowns/ThemeDropdown';

const links = [
  {
    href: '/',
    name: 'Home',
  },
  {
    href: '/favorites',
    name: 'Favorites',
    isFavorite: true,
  },
  {
    href: '/meal-plan',
    name: 'Meal Plan',
  },
];

const NavBar = () => {
  const [isCartOpen, setIsCartOpen] = useState<null | boolean>(null);

  const { windowHeight } = useContext(ResizeWindowContext);
  const { toggleSearchBar } = useContext(SearchBarContext);
  const { favorites } = useContext(FavoritesContext);

  const router = useRouter();

  const toggleCart = () => {
    setIsCartOpen((state) => {
      disablePageScroll(!state);
      return !state;
    });
  };

  usePathChange(isCartOpen ? toggleCart : () => {});

  return (
    <nav>
      <Styled.NavBar>
        <Link
          href='/'
          aria-label='navigate to homepage'
        >
          <Styled.Logo>
            <Image
              src={LogoSrc}
              alt='My Meal Plan'
              priority
              height='80'
              width='128'
            />
          </Styled.Logo>
        </Link>

        <Styled.HambuergerMenu
          aria-label='open navigation'
          onClick={toggleCart}
          $isCartOpen={isCartOpen}
        >
          <div></div>
        </Styled.HambuergerMenu>

        <Styled.SlideCart
          $windowHeight={windowHeight}
          $isCartOpen={isCartOpen}
        >
          <Styled.NavLinks $isCartOpen={isCartOpen}>
            {links.map(({ href, name, isFavorite }) => (
              <Styled.NavLink
                $isActive={router.pathname === href}
                $isFavorite={isFavorite}
                $isCartOpen={isCartOpen}
                key={href}
              >
                <Link href={href}>
                  <a data-favorite={favorites.length}>{name}</a>
                </Link>
              </Styled.NavLink>
            ))}
          </Styled.NavLinks>

          <Styled.NavSubItems $isCartOpen={isCartOpen}>
            <Styled.NavSubItem>
              <ThemeDropdown />
            </Styled.NavSubItem>
            <Styled.NavSubItem>
              <button
                aria-label='search'
                onClick={toggleSearchBar}
              >
                <a>
                  <SearchSvg />
                </a>
              </button>
            </Styled.NavSubItem>
            <Styled.NavSubItem>
              <Link
                aria-label='go to login page'
                href='/login'
              >
                <a>
                  <ProfileSvg />
                </a>
              </Link>
            </Styled.NavSubItem>
          </Styled.NavSubItems>
        </Styled.SlideCart>
      </Styled.NavBar>

      <CategoriesBar />
    </nav>
  );
};

export default NavBar;
