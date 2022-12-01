import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSession } from 'next-auth/react';

export default async function createMealPlan(req: NextApiRequest, res: NextApiResponse) {
  const { userId, mealPlanName } = req.body;
  const session = await getSession({ req });

  if (session && userId && mealPlanName) {
    const doesMealPlanAlreadyExists = await prisma.mealPlan.findFirst({
      where: {
        userId,
        mealPlanName,
      },
    });

    if (doesMealPlanAlreadyExists) {
      return res.status(500).send('Meal plan already exists.');
    } else {
      await prisma.mealPlan.create({
        data: {
          userId,
          mealPlanName,
        },
      });

      res.status(200).send('Meal plan added successfully.');
    }
  } else {
    res.status(500).send('Operation failed.');
  }
}
``;
