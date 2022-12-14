import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './NavBar.styles';
import LogoSrc from 'assets/logo.png';
import ProfileSvg from 'assets/SVG/Profile';
import SearchSvg from 'assets/SVG/Search';
import CategoriesBar from './CategoriesBar/CategoriesBar';
import { ResizeWindowContext } from 'context/ResizeWindowContext';
import { SearchBarContext } from 'context/SearchBarContext';
import { FavoritesContext } from 'context/FavoritesContext';
import { disablePageScroll } from 'utils/disablePageScroll';
import { ROUTES } from 'utils/routes';
import { usePathChange } from 'hooks/usePathChange';
import { useSessionHelper } from 'hooks/useSessionHelper';
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

  const { data, status } = useSessionHelper();

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
                  <a data-favorite={isFavorite ? favorites.length : undefined}>{name}</a>
                </Link>
              </Styled.NavLink>
            ))}
          </Styled.NavLinks>

          <Styled.NavSubItems $isCartOpen={isCartOpen}>
            <Styled.NavSubItem>
              <ThemeCombobox />
            </Styled.NavSubItem>
            <Styled.NavSubItem>
              <Styled.NavSubItemButton
                aria-label='search'
                onClick={toggleSearchBar}
              >
                <SearchSvg />
              </Styled.NavSubItemButton>
            </Styled.NavSubItem>
            <Styled.NavSubItem>
              {status === 'loading' ? (
                <Loading height={30} />
              ) : status === 'authenticated' ? (
                <Link href={ROUTES.profile.overwiew}>
                  <Styled.NavSubItemButton
                    as='a'
                    aria-label='go to profile page'
                  >
                    {data?.user.image ? (
                      <Styled.ProfileImage>
                        <img
                          src={data.user.image}
                          alt={data.user.name || 'profile image'}
                          height='40'
                          width='40'
                        />
                      </Styled.ProfileImage>
                    ) : (
                      <ProfileSvg />
                    )}
                  </Styled.NavSubItemButton>
                </Link>
              ) : status === 'unauthenticated' ? (
                <Link href={ROUTES.profile.logIn}>
                  <Styled.NavSubItemButton
                    as='a'
                    aria-label='go to login page'
                  >
                    <ProfileSvg />
                  </Styled.NavSubItemButton>
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
