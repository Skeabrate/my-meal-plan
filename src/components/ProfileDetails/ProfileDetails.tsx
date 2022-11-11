import { useMemo } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import * as Styled from './ProfileDetails.styles';
import { useTabs } from 'hooks/useTabs';
import { useProfileDetailsPathChange } from './hooks/useProfileDetailsPathChange';
import FavoritesSvg from 'assets/SVG/Marked.svg';
import LogoutSvg from 'assets/SVG/Logout.svg';
import ProfileSvg from 'assets/SVG/Profile.svg';
import MealSvg from 'assets/SVG/Meal.svg';
import GoBackButton from 'components/GoBackButton/GoBackButton';
import Overwiew from 'components/ProfileDetails/tabs/Overwiew';
import MealPlans from 'components/ProfileDetails/tabs/MealPlans/MealPlans';
import Loading from 'components/Loading/Loading';

const ProfileDetails = () => {
  const tabs = useMemo(
    () => [
      {
        id: 0,
        label: (
          <>
            <span>
              <ProfileSvg />
            </span>
            Overwiew
          </>
        ),
        Component: <Overwiew />,
      },
      {
        id: 1,
        label: (
          <>
            <span>
              <MealSvg />
            </span>
            Meal Plans
          </>
        ),
        Component: <MealPlans />,
      },
    ],
    []
  );

  const { activeDetails, setActiveDetails, selectedTab } = useTabs(tabs);

  return (
    <Styled.ProfileDetails>
      <Styled.SideBar>
        <Styled.BackButton>
          <GoBackButton />
        </Styled.BackButton>

        <Styled.Options>
          {tabs.map(({ id: tabId, label }) => (
            <li key={tabId}>
              <Styled.Button
                onClick={() => {}}
                $isActive={activeDetails === tabId}
              >
                {label}
              </Styled.Button>
            </li>
          ))}

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

      <Styled.Tab>{selectedTab}</Styled.Tab>
    </Styled.ProfileDetails>
  );
};

export default ProfileDetails;
