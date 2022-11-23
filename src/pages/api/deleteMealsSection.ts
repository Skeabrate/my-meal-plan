import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function deleteMealsSection(req: NextApiRequest, res: NextApiResponse) {
  const daysId = req.query.daysId as string;
  const mealsSectionId = req.query.mealsSectionId as string;

  if (mealsSectionId) {
    await prisma.mealsSection.delete({
      where: {
        id: mealsSectionId,
      },
    });

    const mealsSectionsInCurrentDay = await prisma.mealsSection.findMany({
      where: {
        daysId,
      },
    });

    if (!mealsSectionsInCurrentDay.length) {
      await prisma.days.delete({
        where: {
          id: daysId,
        },
      });
    }

    res.status(200).send({ message: 'Meals section deleted successfully' });
  } else {
    res.status(500).send({ error: 'Operation failed' });
  }
}
