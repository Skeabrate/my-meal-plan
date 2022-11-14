import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';

const Profile = () => {};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/profile/overview',
        permament: false,
      },
      props: { session },
    };
  }
}

export default Profile;

Profile.Layout = ProfileLayout;
