import * as reactQuery from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

type TVariables = { [key: string]: string };

export const useMutation = (
  url: string,
  onSuccess?: (data: AxiosResponse<any, any>, variables: TVariables, context?: unknown) => void,
  onError?: (err: AxiosError, variables: TVariables, context?: unknown) => void
) => {
  const mutation = reactQuery.useMutation({
    mutationFn: (body: {}) => {
      return axios.post(url, body);
    },
    onSuccess,
    onError,
  });

  return {
    mutation: (body: {}) => mutation.mutate(body),
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error?.response?.data,
  };
};
