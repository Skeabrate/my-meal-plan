import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';
import { TEST_USER } from 'utils/testUser';

const mealPlanHandler = async (userId: string, mealPlanName: string) => {
  return await prisma.mealPlan.findFirst({
    where: {
      userId,
      mealPlanName,
    },
  });
};

export default async function fetchMealPlan(req: NextApiRequest, res: NextApiResponse) {
  const { userId, mealPlanName } = req.body;
  const session = await getSessionHelper(req);

  if (session.session && userId && mealPlanName) {
    const mealPlan = await mealPlanHandler(userId, mealPlanName);

    if (mealPlan) {
      res.status(200).json({
        id: mealPlan.id,
        mealPlanName: mealPlan.mealPlanName,
      });
    } else {
      res.status(500).send('Meal plan not found.');
    }
  } else if (session.testUser && mealPlanName) {
    const mealPlan = await mealPlanHandler(TEST_USER, mealPlanName);

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
