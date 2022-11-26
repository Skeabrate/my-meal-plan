import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function fetchMealsSections(req: NextApiRequest, res: NextApiResponse) {
  const { dayName, mealPlanId } = req.body;

  if (dayName && mealPlanId) {
    const mealsSections = await prisma.mealsSection.findMany({
      where: {
        Day: {
          mealPlanId,
          dayName,
        },
      },
    });
    res.status(200).json(mealsSections);
  } else {
    res.status(500).send('Operation failed');
  }
}
