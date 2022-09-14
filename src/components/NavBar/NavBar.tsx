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
    setIsCartOpen((state) => {
      if (state) {
        document.body.style.position = 'unset';
        document.body.style.top = '';
        document.body.style.width = 'unset';
        document.body.style.overflow = 'unset';
      } else {
        document.body.style.position = 'fixed';
        document.body.style.top = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
      }
      return !state;
    });
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

        <Styled.SlideCart $isCartOpen={isCartOpen}>
          <Styled.NavLinks $isCartOpen={isCartOpen}>
            {links.map(({ href, name }) => (
              <li key={href}>
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </Styled.NavLinks>

          <Styled.NavSubItems $isCartOpen={isCartOpen}>
            <li>
              <Link href='/search'>
                <a>
                  <SearchSvg />
                </a>
              </Link>
            </li>
            <li>
              <Link href='/profile'>
                <a>
                  <ProfileSvg />
                </a>
              </Link>
            </li>
          </Styled.NavSubItems>
        </Styled.SlideCart>
      </Styled.NavBar>

      {/* <div>
        <CategoriesBar />
      </div> */}
    </Styled.Nav>
  );
};

export default NavBar;
