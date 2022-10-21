import { AxiosError } from 'axios';

export type ApiResponseType = {
  isLoading: boolean;
  error: AxiosError;
};
