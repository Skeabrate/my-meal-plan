import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function deleteAccount(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;

  if (userId) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.status(200).send('User deleted successfully');
  } else {
    res.status(500).send('Operation failed');
  }
}
