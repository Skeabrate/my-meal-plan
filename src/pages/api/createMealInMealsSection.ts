import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { fetchMealById } from 'api/mealdb/useFetchMealById';
import { getSession } from 'next-auth/react';

export default async function createMealInMealsSection(req: NextApiRequest, res: NextApiResponse) {
  const { mealsSectionId, mealId } = req.body;
  const session = await getSession({ req });

  if (session && mealsSectionId && mealId) {
    const checkIfMealIdExistsInMealDb = await fetchMealById(mealId);

    if (checkIfMealIdExistsInMealDb) {
      const checkIfMealExistsInPscaleDb = await prisma.meal.findFirst({
        where: {
          mealsSectionId,
          mealId,
        },
      });

      if (checkIfMealExistsInPscaleDb) {
        res.status(500).send('Meal already added to your meals section.');
      } else {
        await prisma.meal.create({
          data: {
            mealsSectionId,
            mealId,
          },
        });

        res.status(200).send('Meal added to meals section.');
      }
    } else {
      res.status(500).send(`Meal doesn't exist.`);
    }
  } else {
    res.status(500).send('Operation failed.');
  }
}
``;
