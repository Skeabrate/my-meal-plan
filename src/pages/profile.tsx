import React from 'react';
import Image from 'next/image';
import { GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Loading from 'components/Loading/Loading';
import LoginButton from 'components/LoginButton/LoginButton';

const Profile = () => {
  const { data, status } = useSession();

  return status === 'loading' ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div>
      <h1>Signed in</h1>

      <Image
        src={data?.user.image!}
        alt={data?.user.name!}
        height='200'
        width='200'
      />

      <p>{data?.user.name}</p>
      <p>{data?.user.email}</p>

      <LoginButton />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Profile;
