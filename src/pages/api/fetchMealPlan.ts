import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function fetchMealPlan(req: NextApiRequest, res: NextApiResponse) {
  const { userId, mealPlanName } = req.body;

  if (userId && mealPlanName) {
    const mealPlan = await prisma.mealPlan.findFirst({
      where: {
        userId,
        mealPlanName,
      },
    });

    if (mealPlan) {
      res.status(200).json({
        id: mealPlan.id,
        mealPlanName: mealPlan.mealPlanName,
      });
    } else {
      res.status(500).send('Meal plan not found.');
    }
  } else {
    res.status(500).send('Operation failed.');
  }
}
