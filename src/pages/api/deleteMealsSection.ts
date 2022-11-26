import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function deleteMealsSection(req: NextApiRequest, res: NextApiResponse) {
  const { dayId, mealsSectionId } = req.body;

  if (dayId && mealsSectionId) {
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
  } else {
    res.status(500).send('Operation failed');
  }
}
