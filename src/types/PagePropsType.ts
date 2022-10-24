import type { AppProps } from 'next/app';
import { NextPageContext } from 'next';
import { DehydratedState } from 'react-query';
import { Session } from 'next-auth';

export type PageProps = {
  dehydratedState?: DehydratedState;
  session: Session;
};

export type ExtendedAppProps<P = {}> = {
  err?: NextPageContext['err'];
} & AppProps<P>;
