import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';

export default async function deleteAccount(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;
  const session = await getSessionHelper(req);

  if (session.session && userId) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.status(200).send('User deleted successfully.');
  } else if (session.testUser) {
    res.status(500).send("You can't delete test account.");
  } else {
    res.status(500).send('Operation failed.');
  }
}
