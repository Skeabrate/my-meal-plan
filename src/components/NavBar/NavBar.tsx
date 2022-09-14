import React, { useState } from 'react';
import Image from 'next/image';
import LogoSrc from 'assets/logo.png';
import ProfileSvg from 'assets/SVG/Profile.svg';
import SearchSvg from 'assets/SVG/Search.svg';
import Link from 'next/link';
import CategoriesBar from './CategoriesBar/CategoriesBar';
import * as Styled from './NavBar.styles';

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
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((state) => !state);
  };

  return (
    <Styled.Nav>
      <Styled.NavBar>
        <Link href='/'>
          <a>
            <Image src={LogoSrc} alt='My Meal Plan' height='80' width='128' />
          </a>
        </Link>

        <Styled.HambuergerMenu onClick={toggleCart} $isCartOpen={isCartOpen}>
          <div></div>
        </Styled.HambuergerMenu>

        <Styled.SlideCart>
          <ul>
            {links.map(({ href, name }) => (
              <li key={href}>
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>

          <ul>
            <li>
              <button>
                <SearchSvg />
              </button>
            </li>
            <li>
              <Link href='/profile'>
                <a>
                  <ProfileSvg />
                </a>
              </Link>
            </li>
          </ul>
        </Styled.SlideCart>
      </Styled.NavBar>

      {/* <div>
        <CategoriesBar />
      </div> */}
    </Styled.Nav>
  );
};

export default NavBar;
