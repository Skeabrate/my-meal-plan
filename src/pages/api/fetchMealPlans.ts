import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';

export default async function fetchMealPlans(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;
  const session = await getSessionHelper(req);

  if (session.session && userId) {
    const mealPlans = await prisma.mealPlan.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json(mealPlans);
  } else if (session.testUser) {
    res.status(200).json([]);
  }
  {
    res.status(500).send('Operation failed.');
  }
}
