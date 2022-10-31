import React from 'react';
import Image from 'next/image';
import { GetServerSidePropsContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import useDeleteAcount from 'api/pscale/useDeleteAcount';
import Loading from 'components/Loading/Loading';
import GoBackButton from 'components/GoBackButton/GoBackButton';

const Profile = () => {
  const { data, status } = useSession();
  const { deleteAccount, isLoading, error } = useDeleteAcount();

  const deleteAccountConfirmation = () => {
    if (confirm('Are you sure you want to delete your account?') && data?.user.email) {
      deleteAccount(data?.user.email);
    }
  };

  return (
    <>
      <GoBackButton />

      <div>
        {status === 'loading' ? (
          <Loading />
        ) : (
          <>
            <h1>Signed in</h1>

            {data?.user.image && (
              <Image
                src={data?.user.image}
                alt={data?.user.name || data?.user.email!}
                height='200'
                width='200'
              />
            )}

            <p>{data?.user.name}</p>
            <p>{data?.user.email}</p>

            <button onClick={() => signOut()}>Sign out</button>
            <br />
            <button onClick={deleteAccountConfirmation}>
              {isLoading ? <Loading height={40} /> : 'Delete Account'}
            </button>

            {error ? <p>{error}</p> : null}
          </>
        )}
      </div>
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
