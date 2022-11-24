import axios from 'axios';
import * as reactQuery from 'react-query';

export const useMutation = (url: string, onSuccess?: () => void) => {
  const mutation = reactQuery.useMutation({
    mutationFn: (body: {}) => {
      return axios.post(url, body);
    },
    onSuccess,
  });

  return {
    mutation: (body: {}) => mutation.mutate(body),
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: axios.isAxiosError(mutation.error) && mutation.error.message,
  };
};
