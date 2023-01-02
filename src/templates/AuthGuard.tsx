import { useRouter } from 'next/router';
import Loading from 'components/Loading/Loading';
import { ROUTES } from 'utils/routes';
import { useSessionHelper } from 'hooks/useSessionHelper';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSessionHelper();
  const router = useRouter();

  const loading = <Loading height={600} />;

  if (status === 'loading') {
    return loading;
  } else if (status === 'unauthenticated') {
    router.replace({
      pathname: ROUTES.profile.logIn,
    });
    return loading;
  } else {
    return <>{children}</>;
  }
};

export default AuthGuard;
