import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import ProfileDetails from 'components/ProfileDetails/ProfileDetails';
import Overwiew from 'components/ProfileDetails/tabs/Overwiew';
import MealPlans from 'components/ProfileDetails/tabs/MealPlans/MealPlans';
import ProfileSvg from 'assets/SVG/Profile.svg';
import MealSvg from 'assets/SVG/Meal.svg';

const Profile = () => {
  return (
    <ProfileDetails
      tabs={[
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
      ]}
    />
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
