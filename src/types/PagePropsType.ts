import { ComponentType } from 'react';
import type { AppProps } from 'next/app';
import { NextPageContext } from 'next';
import { DehydratedState } from 'react-query';
import { Session } from 'next-auth';

type LayoutProps = {
  Component: {
    Layout?: ComponentType;
  };
};

type AuthProps = {
  Component: {
    requireAuth?: boolean;
  };
};

export type PageProps = {
  dehydratedState?: DehydratedState;
  session: Session;
};

export type ExtendedAppProps<P = {}> = {
  err?: NextPageContext['err'];
} & AppProps<P> &
  LayoutProps &
  AuthProps;
