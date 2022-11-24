import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function deleteMealFromMealsSection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { mealId } = req.body;

  if (mealId) {
    await prisma.meal.delete({
      where: {
        id: mealId,
      },
    });

    res.status(200).send('Meal deleted successfully');
  } else {
    res.status(500).send('Operation failed');
  }
}
