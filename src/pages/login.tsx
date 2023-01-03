import Link from 'next/link';
import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import * as Styled from 'styles/login.styles';
import { ROUTES } from 'utils/routes';
import { TEST_USER } from 'utils/testUser';

const Login = () => {
  const router = useRouter();

  const handleTestUser = () => {
    setCookie(TEST_USER, TEST_USER, { maxAge: 7 * 24 * 60 * 60 });
    router.reload();
  };

  return (
    <Styled.Login>
      <Styled.LoginForm>
        <h1>Log in</h1>

        <Styled.Options>
          <Link href={ROUTES.profile.signIn}>Sign in with Providers</Link>
          <p>or</p>
          <button onClick={handleTestUser}>Log in as a Test User</button>
        </Styled.Options>
      </Styled.LoginForm>
    </Styled.Login>
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
