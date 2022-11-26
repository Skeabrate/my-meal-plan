import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function fetchMealPlan(req: NextApiRequest, res: NextApiResponse) {
  const { userEmail, mealPlanName } = req.body;

  if (userEmail && mealPlanName) {
    const mealPlan = await prisma.mealPlan.findFirst({
      where: {
        mealPlanName,
        userEmail,
      },
    });

    if (mealPlan) {
      const days = await prisma.day.findMany({
        where: {
          mealPlanId: mealPlan.id,
        },
      });

      res.status(200).json({
        id: mealPlan.id,
        mealPlanName: mealPlan.mealPlanName,
        days,
      });
    } else {
      res.status(500).send('Meal plan not found.');
    }
  } else {
    res.status(500).send('Operation failed');
  }
}
