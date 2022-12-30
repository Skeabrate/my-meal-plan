import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Loading from 'components/Loading/Loading';
import { ROUTES } from 'utils/routes';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  const loading = <Loading height={600} />;

  if (status === 'loading') {
    return loading;
  } else if (status === 'unauthenticated') {
    router.replace({
      pathname: ROUTES.profile.signIn,
    });
    return loading;
  } else {
    return <>{children}</>;
  }
};

export default AuthGuard;
