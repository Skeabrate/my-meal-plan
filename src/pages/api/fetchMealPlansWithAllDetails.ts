import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getDays } from 'utils/getDays';

export default async function fetchMealPlansWithAllDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userEmail = req.query.userEmail as string;

  if (userEmail) {
    const getMealPlans = await prisma.mealPlan.findMany({
      where: {
        User: {
          email: userEmail,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    let mealPlans = [];

    for await (const { id, mealPlanName } of getMealPlans) {
      const days = await getDays(id);

      mealPlans.push({
        id,
        mealPlanName,
        days,
      });
    }

    res.status(200).json(mealPlans);
  } else {
    res.status(500).send({ error: 'Operation failed' });
  }
}
