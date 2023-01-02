import React from 'react';
import * as Styled from './ProfileLayout.styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { deleteCookie } from 'cookies-next';
import { ROUTES } from 'utils/routes';
import { TEST_USER } from 'utils/testUser';
import FavoritesSvg from 'assets/SVG/Marked';
import LogoutSvg from 'assets/SVG/Logout';
import ProfileSvg from 'assets/SVG/Profile';
import MealSvg from 'assets/SVG/Meal';
import GoBackButton from 'components/GoBackButton/GoBackButton';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const isLinkActive = (href: string) => router.pathname.includes(href);

  const signOutHandler = () => {
    deleteCookie(TEST_USER);
    signOut();
  };

  return (
    <Styled.ProfileDetails>
      <Styled.SideBar>
        <Styled.BackButton>
          <GoBackButton />
        </Styled.BackButton>

        <Styled.Options>
          <Styled.ActiveLink $isActive={isLinkActive(ROUTES.profile.overwiew)}>
            <Link href={ROUTES.profile.overwiew}>
              <a>
                <span>
                  <ProfileSvg />
                </span>
                Overview
              </a>
            </Link>
          </Styled.ActiveLink>
          <Styled.ActiveLink $isActive={isLinkActive(ROUTES.profile.mealPlans)}>
            <Link href={ROUTES.profile.mealPlans}>
              <a>
                <span>
                  <MealSvg />
                </span>
                Meal Plans
              </a>
            </Link>
          </Styled.ActiveLink>
          <li>
            <Link href='/favorites'>
              <a>
                <span>
                  <FavoritesSvg />
                </span>
                Favorites
              </a>
            </Link>
          </li>
          <Styled.Logout>
            <button onClick={signOutHandler}>
              <span>
                <LogoutSvg />
              </span>
              Logout
            </button>
          </Styled.Logout>
        </Styled.Options>
      </Styled.SideBar>

      {children}
    </Styled.ProfileDetails>
  );
};

export default ProfileLayout;
