import React from 'react';
import LoginButton from 'components/LoginButton/LoginButton';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>

      <LoginButton />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Login;
