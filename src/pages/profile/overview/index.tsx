import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useDeleteAcount } from 'api/pscale/useDeleteAcount';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayuot from 'layouts/ProbileTabLayout/ProbileTabLayout';
import Loading from 'components/Loading/Loading';

const Overview = () => {
  const { data: session } = useSession();
  const { deleteAccount, isLoading, error } = useDeleteAcount();

  const deleteAccountConfirmation = () => {
    if (confirm('Are you sure you want to delete your account?') && session?.user.email) {
      deleteAccount(session?.user.email);
    }
  };

  return (
    <ProfileTabLayuot label='Profile Information:'>
      {session?.user.image && (
        <Image
          src={session?.user.image}
          alt={session?.user.name || session?.user.email!}
          height='140'
          width='140'
        />
      )}

      <p>{session?.user.name}</p>
      <p>{session?.user.email}</p>

      <button onClick={deleteAccountConfirmation}>
        {isLoading ? <Loading height={40} /> : 'Delete Account'}
      </button>

      {error ? <p>{error}</p> : null}
    </ProfileTabLayuot>
  );
};

export default Overview;

Overview.Layout = ProfileLayout;
Overview.requireAuth = true;
