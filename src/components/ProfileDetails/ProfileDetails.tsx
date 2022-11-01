import Link from 'next/link';
import { signOut } from 'next-auth/react';
import * as Styled from './ProfileDetails.styles';
import { useTabs, TabsType } from 'hooks/useTabs';

const ProfileDetails = ({ tabs }: { tabs: TabsType }) => {
  const { activeDetails, setActiveDetails, selectedTab } = useTabs(tabs);

  return (
    <Styled.ProfileDetails>
      <Styled.Options>
        {tabs.map(({ label }) => (
          <li key={label}>
            <Styled.Button
              onClick={() => setActiveDetails(label)}
              $isActive={activeDetails === label}
            >
              {label}
            </Styled.Button>
          </li>
        ))}

        <li>
          <Link href='/favorites'>Favorites</Link>
        </li>
        <li>
          <button onClick={() => signOut()}>Logout</button>
        </li>
      </Styled.Options>

      <Styled.Tab>{selectedTab}</Styled.Tab>
    </Styled.ProfileDetails>
  );
};

export default ProfileDetails;
