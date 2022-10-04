export type ApiResponseType = {
  isLoading: boolean;
  error:
    | {
        message?: string;
      }
    | any;
};
