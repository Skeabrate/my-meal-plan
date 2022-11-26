import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function fetchMealsFromMealsSection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { mealsSectionId } = req.body;

  if (mealsSectionId) {
    const meals = await prisma.meal.findMany({
      where: {
        mealsSectionId,
      },
    });

    res.status(200).json(meals);
  } else {
    res.status(500).send('Operation failed');
  }
}
