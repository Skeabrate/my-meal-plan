import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function deleteMealFromMealsSection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mealId = req.query.mealId as string;

  if (mealId) {
    await prisma.meal.delete({
      where: {
        id: mealId,
      },
    });

    res.status(200).send({ message: 'Meal deleted successfully' });
  } else {
    res.status(500).send({ error: 'Operation failed' });
  }
}
