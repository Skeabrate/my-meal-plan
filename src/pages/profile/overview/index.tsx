import { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMutation } from 'hooks/useMutation';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayuot from 'layouts/ProbileTabLayout/ProbileTabLayout';
import Loading from 'components/Loading/Loading';
import { useInfoModal } from 'components/InfoModal/InfoModal';

const Overview = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    mutation: deleteAccount,
    isLoading,
    isError,
    error,
  } = useMutation('/api/deleteAccount', () => {
    router.push('/api/auth/signin');
  });

  const deleteAccountConfirmation = () => {
    if (confirm('Are you sure you want to delete your account?') && session?.user.id) {
      deleteAccount({ userId: session?.user.id });
    }
  };

  const actionErrors = useMemo(() => [{ isError, error }], [isError, error]);

  useInfoModal(actionErrors);

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
    </ProfileTabLayuot>
  );
};

export default Overview;

Overview.Layout = ProfileLayout;
Overview.requireAuth = true;
