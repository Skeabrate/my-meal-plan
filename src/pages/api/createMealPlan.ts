import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';

const getIfMealPlanAlreadyExists = async (userId: string, mealPlanName: string) => {
  return await prisma.mealPlan.findFirst({
    where: {
      userId,
      mealPlanName,
    },
  });
};

const createMealPlanHandler = async (userId: string, mealPlanName: string) => {
  await prisma.mealPlan.create({
    data: {
      userId,
      mealPlanName,
    },
  });
};

export default async function createMealPlan(req: NextApiRequest, res: NextApiResponse) {
  const { userId, mealPlanName } = req.body;
  const session = await getSessionHelper(req);

  if (session.session && userId && mealPlanName) {
    if (await getIfMealPlanAlreadyExists(userId, mealPlanName)) {
      return res.status(500).send('Meal plan already exists.');
    } else {
      await createMealPlanHandler(userId, mealPlanName);
      res.status(200).send('Meal plan added successfully.');
    }
  } else if (session.testUser) {
    res.status(500).send('You are not allowed to modify test account meal plans.');
  } else {
    res.status(500).send('Operation failed.');
  }
}
``;
