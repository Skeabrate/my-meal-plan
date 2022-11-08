import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import * as Styled from './ProfileDetails.styles';
import { useTabs } from 'hooks/useTabs';
import FavoritesSvg from 'assets/SVG/Marked.svg';
import LogoutSvg from 'assets/SVG/Logout.svg';
import ProfileSvg from 'assets/SVG/Profile.svg';
import MealSvg from 'assets/SVG/Meal.svg';
import GoBackButton from 'components/GoBackButton/GoBackButton';
import Overwiew from 'components/ProfileDetails/tabs/Overwiew';
import MealPlans from 'components/ProfileDetails/tabs/MealPlans/MealPlans';

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

  const router = useRouter();

  const { activeDetails, setActiveDetails, selectedTab } = useTabs(tabs);

  useEffect(() => {
    const newTab = tabs.find((tab) => tab.label.props.children[1] === router.query?.activeTab)?.id;

    newTab ? setActiveDetails(newTab) : setActiveDetails(tabs[0].id);
  }, [router.query, tabs, setActiveDetails]);

  return (
    <Styled.ProfileDetails>
      <Styled.SideBar>
        <Styled.BackButton>
          <GoBackButton />
        </Styled.BackButton>

        <Styled.Options>
          {tabs.map(({ id, label }) => (
            <li key={id}>
              <Styled.Button
                onClick={() => {
                  router.push({
                    query: { activeTab: label.props.children[1] },
                  });
                  setActiveDetails(id);
                }}
                $isActive={activeDetails === id}
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
