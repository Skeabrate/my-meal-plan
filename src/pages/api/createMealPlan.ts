import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function createMealPlan(req: NextApiRequest, res: NextApiResponse) {
  const { userEmail, mealPlanName } = req.body;

  if (userEmail && mealPlanName) {
    const doesMealPlanAlreadyExists = await prisma.mealPlan.findFirst({
      where: {
        userEmail,
        mealPlanName,
      },
    });

    if (doesMealPlanAlreadyExists) {
      return res.status(500).send({ error: 'Meal plan already exists.' });
    } else {
      await prisma.mealPlan.create({
        data: {
          userEmail,
          mealPlanName,
        },
      });

      res.status(200).send({ message: 'Meal plan added successfully' });
    }
  } else {
    res.status(500).send({ error: 'Operation failed' });
  }
}
``;
