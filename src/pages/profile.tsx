import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import GoBackButton from 'components/GoBackButton/GoBackButton';
import ProfileDetails from 'components/ProfileDetails/ProfileDetails';
import Overwiew from 'components/ProfileDetails/tabs/Overwiew';
import MealPlans from 'components/ProfileDetails/tabs/MealPlans';

const Profile = () => {
  return (
    <>
      <GoBackButton />

      <ProfileDetails
        tabs={[
          { label: 'Overwiew', Component: <Overwiew /> },
          { label: 'Meal Plans', Component: <MealPlans /> },
        ]}
      />
    </>
  );
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
