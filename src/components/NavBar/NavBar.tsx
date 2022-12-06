import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './NavBar.styles';
import { useSession } from 'next-auth/react';
import LogoSrc from 'assets/logo.png';
import ProfileSvg from 'assets/SVG/Profile.svg';
import SearchSvg from 'assets/SVG/Search.svg';
import CategoriesBar from './CategoriesBar/CategoriesBar';
import { ResizeWindowContext } from 'context/ResizeWindowContext';
import { SearchBarContext } from 'context/SearchBarContext';
import { FavoritesContext } from 'context/FavoritesContext';
import { disablePageScroll } from 'utils/disablePageScroll';
import { usePathChange } from 'hooks/usePathChange';
import { ROUTES } from 'utils/routes';
import ThemeCombobox from 'components/Comboboxes/ThemeCombobox';
import Loading from 'components/Loading/Loading';

const links = [
  {
    href: ROUTES.index,
    name: 'Home',
  },
  {
    href: ROUTES.favorites,
    name: 'Favorites',
    isFavorite: true,
  },
  {
    href: ROUTES.profile.mealPlans,
    name: 'Meal Plans',
  },
];

const NavBar = () => {
  const [isCartOpen, setIsCartOpen] = useState<null | boolean>(null);

  const { windowHeight } = useContext(ResizeWindowContext);
  const { toggleSearchBar } = useContext(SearchBarContext);
  const { favorites } = useContext(FavoritesContext);

  const { data, status } = useSession();

  const router = useRouter();

  const toggleCart = () => {
    setIsCartOpen((state) => {
      disablePageScroll(!state);
      return !state;
    });
  };

  usePathChange(isCartOpen ? toggleCart : () => {});

  return (
    <Styled.NavWrapper>
      <Styled.NavBar>
        <Link href={ROUTES.index}>
          <a aria-label='navigate to homepage'>
            <Styled.Logo>
              <Image
                src={LogoSrc}
                alt='My Meal Plan'
                priority
                height='80'
                width='128'
              />
            </Styled.Logo>
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
              <ThemeCombobox />
            </Styled.NavSubItem>
            <Styled.NavSubItem>
              <button
                aria-label='search'
                onClick={toggleSearchBar}
              >
                <SearchSvg />
              </button>
            </Styled.NavSubItem>
            <Styled.NavSubItem>
              {status === 'loading' ? (
                <Loading height={30} />
              ) : status === 'authenticated' ? (
                <Link href={ROUTES.profile.overwiew}>
                  <a aria-label='go to profile page'>
                    {data?.user.image ? (
                      <Styled.ProfileImage>
                        <Image
                          src={data.user.image}
                          alt={data.user.name || 'profile image'}
                          height='40'
                          width='40'
                        />
                      </Styled.ProfileImage>
                    ) : (
                      <ProfileSvg />
                    )}
                  </a>
                </Link>
              ) : status === 'unauthenticated' ? (
                <Link href={ROUTES.profile.signIn}>
                  <a aria-label='go to login page'>
                    <ProfileSvg />
                  </a>
                </Link>
              ) : null}
            </Styled.NavSubItem>
          </Styled.NavSubItems>
        </Styled.SlideCart>
      </Styled.NavBar>

      <CategoriesBar />
    </Styled.NavWrapper>
  );
};

export default NavBar;
