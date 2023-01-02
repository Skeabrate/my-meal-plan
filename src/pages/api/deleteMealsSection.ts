import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';

export default async function deleteMealsSection(req: NextApiRequest, res: NextApiResponse) {
  const { dayId, mealsSectionId } = req.body;
  const session = await getSessionHelper(req);

  if (session.session && dayId && mealsSectionId) {
    await prisma.mealsSection.delete({
      where: {
        id: mealsSectionId,
      },
    });

    const mealsSectionsInCurrentDay = await prisma.mealsSection.findMany({
      where: {
        dayId,
      },
    });

    if (!mealsSectionsInCurrentDay.length) {
      await prisma.day.delete({
        where: {
          id: dayId,
        },
      });
    }

    res.status(200).send('Meals section deleted successfully');
  } else if (session.testUser) {
    res.status(500).send('You are not allowed to modify test account meal plans.');
  } else {
    res.status(500).send('Operation failed');
  }
}
