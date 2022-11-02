import Link from 'next/link';
import { signOut } from 'next-auth/react';
import * as Styled from './ProfileDetails.styles';
import { useTabs, TabType } from 'hooks/useTabs';
import FavoritesSvg from 'assets/SVG/Marked.svg';
import LogoutSvg from 'assets/SVG/Logout.svg';

const ProfileDetails = ({ tabs }: { tabs: TabType[] }) => {
  const { activeDetails, setActiveDetails, selectedTab } = useTabs(tabs);

  return (
    <Styled.ProfileDetails>
      <Styled.Options>
        {tabs.map(({ id, label }) => (
          <li key={id}>
            <Styled.Button
              onClick={() => setActiveDetails(label)}
              $isActive={activeDetails === label}
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

      <Styled.Tab>{selectedTab}</Styled.Tab>
    </Styled.ProfileDetails>
  );
};

export default ProfileDetails;
