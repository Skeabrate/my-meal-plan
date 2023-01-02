import { useRouter } from 'next/router';
import { ROUTES } from 'utils/routes';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';

const Profile = () => {
  const router = useRouter();
  router.replace(ROUTES.profile.overwiew);
};

export default Profile;

Profile.Layout = ProfileLayout;
Profile.requireAuth = true;
