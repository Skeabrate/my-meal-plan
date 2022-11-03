import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function deleteAccount(req: NextApiRequest, res: NextApiResponse) {
  const userEmail = req.query.query;

  if (userEmail) {
    await prisma.user.delete({
      where: {
        email: userEmail as string,
      },
    });

    res.status(200).send({ message: 'User deleted successfully' });
  } else {
    res.status(500).send({ error: 'Operation failed' });
  }
}