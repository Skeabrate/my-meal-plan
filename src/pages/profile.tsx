import React from 'react';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data } = useSession();

  console.log(data);

  return (
    <div>
      <h1>Signed in</h1>
    </div>
  );
};

export default Profile;
