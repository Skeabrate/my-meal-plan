import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { fetchMealById } from 'api/mealdb/useFetchMealById';

export default async function addMealToMealsSection(req: NextApiRequest, res: NextApiResponse) {
  const mealsSectionId = req.query.mealsSectionId as string;
  const mealId = req.query.mealId as string;

  if (mealsSectionId && mealId) {
    const checkIfMealIdExistsInMealDb = await fetchMealById(mealId);

    if (checkIfMealIdExistsInMealDb) {
      const checkIfMealExistsInPscaleDb = await prisma.meal.findFirst({
        where: {
          mealsSectionId,
          mealId,
        },
      });

      if (checkIfMealExistsInPscaleDb) {
        res.status(500).send({ error: `Meal already added to your meals section.` });
      } else {
        await prisma.meal.create({
          data: {
            mealsSectionId,
            mealId,
          },
        });

        res.status(200).send({ message: 'Meal added to meals section.' });
      }
    } else {
      res.status(500).send({ error: `Meal doesn't exist.` });
    }
  } else {
    res.status(500).send({ error: 'Operation failed.' });
  }
}
``;
