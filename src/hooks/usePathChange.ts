import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const usePathChange = (handlePathChange: () => void) => {
  const router = useRouter();

  useEffect(() => {
    handlePathChange();
  }, [router.asPath]);
};
