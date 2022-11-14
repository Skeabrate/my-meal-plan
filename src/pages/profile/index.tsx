import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';

const Profile = () => {};

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/profile/overview',
      permament: false,
    },
  };
}

export default Profile;

Profile.Layout = ProfileLayout;
Profile.requireAuth = true;
