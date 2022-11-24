import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import axios from 'axios';

export const useDeleteAcount = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (userEmail: string) => {
      return axios.post('/api/deleteAccount', {
        userEmail,
      });
    },
    onSuccess: () => {
      router.push('/api/auth/signin');
    },
  });

  return {
    deleteAccount: (userEmail: string) => mutation.mutate(userEmail),
    isLoading: mutation.isLoading,
    isError: mutation.isError,
  };
};
