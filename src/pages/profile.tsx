import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import ProfileDetails from 'components/ProfileDetails/ProfileDetails';

const Profile = () => {
  return <ProfileDetails />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Profile;
