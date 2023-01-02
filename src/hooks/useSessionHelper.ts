import type { NextApiRequest } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Prisma from '@prisma/client';
import { useSession, getSession } from 'next-auth/react';
import { getCookie } from 'cookies-next';
import { TEST_USER } from 'utils/testUser';

const fetchTestUser = async (): Promise<Prisma.User | undefined> => {
  try {
    const { data } = await axios.get('/api/fetchTestUser');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const useSessionHelper = () => {
  const [checkTestUser, setCheckTestUser] = useState(false);
  const [testUser, setTestUser] = useState<Prisma.User | undefined>(undefined);
  const [loading, setLoading] = useState<'loading' | 'authenticated' | 'unauthenticated'>(
    'unauthenticated'
  );

  const session = useSession();

  useEffect(() => {
    const authTest = getCookie(TEST_USER);
    if (authTest) {
      setCheckTestUser(true);
      setLoading('loading');
      fetchTestUser()
        .then((res) => {
          setTestUser(res);
          setLoading('authenticated');
        })
        .catch(() => {
          setLoading('unauthenticated');
        });
    }
  }, []);

  return checkTestUser
    ? {
        data: {
          user: {
            id: testUser?.id,
            name: testUser?.name,
            email: testUser?.email,
            image: testUser?.image,
          },
        },
        status: loading,
        expires: '',
      }
    : session;
};

export const getSessionHelper = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  return req.cookies[TEST_USER]
    ? {
        session: false,
        testUser: true,
      }
    : {
        session,
        testUser: false,
      };
};
