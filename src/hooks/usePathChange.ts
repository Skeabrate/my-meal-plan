import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const usePathChange = (handlePathChange: () => void) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', handlePathChange);

    return () => router.events.off('routeChangeStart', handlePathChange);
  }, [handlePathChange, router.events]);
};
