import * as reactQuery from 'react-query';
import axios, { AxiosResponse } from 'axios';

export const useMutation = (
  url: string,
  onSuccess?: (
    data: AxiosResponse<any, any>,
    variables: { [key: string]: string },
    context: unknown
  ) => void
) => {
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
    error: axios.isAxiosError(mutation.error) && mutation.error.response?.data,
  };
};
