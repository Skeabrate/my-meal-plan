import React from 'react';
import Image from 'next/image';
import { GetServerSidePropsContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import Loading from 'components/Loading/Loading';
import axios from 'axios';
import { useRouter } from 'next/router';

const Profile = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const deleteAccount = async () => {
    const res = await axios.get(`/api/deleteAccount?query=${data?.user.email}`);
    if (res.status === 200) router.push('/api/auth/signin');
  };

  return status === 'loading' ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div>
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
      <button onClick={deleteAccount}>Delete Account</button>
    </div>
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
