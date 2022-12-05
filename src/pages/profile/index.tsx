import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  router.replace('/profile/overview');
};

export default Profile;

Profile.Layout = ProfileLayout;
Profile.requireAuth = true;
