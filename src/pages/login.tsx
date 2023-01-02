import Link from 'next/link';
import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import { ROUTES } from 'utils/routes';
import { TEST_USER } from 'utils/testUser';

const Login = () => {
  const router = useRouter();

  const handleTestUser = () => {
    setCookie(TEST_USER, TEST_USER, { maxAge: 7 * 24 * 60 * 60 });
    router.reload();
  };

  return (
    <div>
      <h1>Singin</h1>
      <button onClick={handleTestUser}>Log in as a Test User</button>
      <Link href={ROUTES.profile.signIn}>Sign in with providers</Link>
    </div>
  );
};

export default Login;

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const doesTestUserExist = getCookie(TEST_USER, { req, res });
  if (doesTestUserExist) {
    return {
      redirect: {
        destination: '/profile/overview',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
