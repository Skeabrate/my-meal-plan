import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';
import { TEST_USER } from 'utils/testUser';

export default async function fetchMealsSections(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSessionHelper(req);

  if (session.testUser) {
    const testUser = await prisma.user.findFirst({
      where: {
        id: TEST_USER,
      },
    });
    res.status(200).json(testUser);
  } else {
    res.status(500).send('Operation failed');
  }
}
