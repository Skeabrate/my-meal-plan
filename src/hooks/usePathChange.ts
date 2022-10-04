import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const usePathChange = (handlePathChange: () => void) => {
  const router = useRouter();

  useEffect(() => {
    handlePathChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
};
