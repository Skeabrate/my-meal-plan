import type { AppProps } from 'next/app';
import { NextPageContext } from 'next';
import { DehydratedState } from 'react-query';

export type PageProps = {
  dehydratedState?: DehydratedState;
};

export type ExtendedAppProps<P = {}> = {
  err?: NextPageContext['err'];
} & AppProps<P>;
