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

const links = [
  {
    href: '/',
    name: 'Home',
  },
  {
    href: '/favorites',
    name: 'Favorites',
  },
  {
    href: '/meal-plan',
    name: 'Meal Plan',
  },
];

const NavBar = () => {
  const [isCartOpen, setIsCartOpen] = useState<null | boolean>(null);

  const { windowHeight } = useContext(ResizeWindowContext);

  const router = useRouter();

  const toggleCart = () => {
    setIsCartOpen((state) => {
      if (state) {
        document.body.removeAttribute('style');
      } else {
        document.body.setAttribute(
          'style',
          'position: fixed; top: 0; width: 100%; overflow: hidden'
        );
      }
      return !state;
    });
  };

  return (
    <nav>
      <Styled.NavBar>
        <Link
          href='/'
          aria-label='navigate to homepage'
        >
          <a>
            <Image
              src={LogoSrc}
              alt='My Meal Plan'
              priority
              height='80'
              width='128'
            />
          </a>
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
            {links.map(({ href, name }) => (
              <Styled.NavLink
                $isActive={router.pathname === href}
                $isCartOpen={isCartOpen}
                key={href}
              >
                <Link href={href}>{name}</Link>
              </Styled.NavLink>
            ))}
          </Styled.NavLinks>

          <Styled.NavSubItems $isCartOpen={isCartOpen}>
            <li>
              <Link
                aria-label='search'
                href='/search'
              >
                <a>
                  <SearchSvg />
                </a>
              </Link>
            </li>
            <li>
              <Link
                aria-label='profile'
                href='/profile'
              >
                <a>
                  <ProfileSvg />
                </a>
              </Link>
            </li>
          </Styled.NavSubItems>
        </Styled.SlideCart>
      </Styled.NavBar>

      <CategoriesBar />
    </nav>
  );
};

export default NavBar;
