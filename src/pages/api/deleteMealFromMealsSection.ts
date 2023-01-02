import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';

export default async function deleteMealFromMealsSection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { mealId } = req.body;
  const session = await getSessionHelper(req);

  if (session.session && mealId) {
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
