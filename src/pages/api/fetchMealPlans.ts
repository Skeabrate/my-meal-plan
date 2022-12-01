import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSession } from 'next-auth/react';

export default async function fetchMealPlans(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;
  const session = await getSession({ req });

  if (session && userId) {
    const mealPlans = await prisma.mealPlan.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json(mealPlans);
  } else {
    res.status(500).send('Operation failed.');
  }
}
