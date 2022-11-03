import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const useDeleteAcount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const deleteAccount = async (userEmail: string) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/deleteAccount?query=${userEmail}`);
      if (res.status === 200) router.push('/api/auth/signin');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.message);
        setError(err.message);
      }
    }
    setIsLoading(false);
  };

  return {
    deleteAccount,
    isLoading,
    error,
  };
};

export default useDeleteAcount;