import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function deleteAccount(req: NextApiRequest, res: NextApiResponse) {
  const { userEmail } = req.body;

  if (userEmail) {
    await prisma.user.delete({
      where: {
        email: userEmail,
      },
    });

    res.status(200).send('User deleted successfully');
  } else {
    res.status(500).send('Operation failed');
  }
}
