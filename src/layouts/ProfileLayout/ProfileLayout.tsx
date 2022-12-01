import React from 'react';
import * as Styled from './ProfileLayout.styles';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import FavoritesSvg from 'assets/SVG/Marked.svg';
import LogoutSvg from 'assets/SVG/Logout.svg';
import ProfileSvg from 'assets/SVG/Profile.svg';
import MealSvg from 'assets/SVG/Meal.svg';
import GoBackButton from 'components/GoBackButton/GoBackButton';
import Link from 'next/link';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const isLinkActive = (href: string) => router.pathname.includes(href);

  return (
    <Styled.ProfileDetails>
      <Styled.SideBar>
        <Styled.BackButton>
          <GoBackButton />
        </Styled.BackButton>

        <Styled.Options>
          <Styled.ActiveLink $isActive={isLinkActive('/profile/overview')}>
            <Link href='/profile/overview'>
              <a>
                <span>
                  <ProfileSvg />
                </span>
                Overview
              </a>
            </Link>
          </Styled.ActiveLink>
          <Styled.ActiveLink $isActive={isLinkActive('/profile/meal-plans')}>
            <Link href='/profile/meal-plans'>
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
            <button onClick={() => signOut()}>
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
