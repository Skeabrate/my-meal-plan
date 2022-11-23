import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function fetchMealPlans(req: NextApiRequest, res: NextApiResponse) {
  const { userEmail } = req.body;

  if (userEmail) {
    const mealPlans = await prisma.mealPlan.findMany({
      where: {
        User: {
          email: userEmail,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json(mealPlans);
  } else {
    res.status(500).send({ error: 'Operation failed' });
  }
}
