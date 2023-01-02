import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';
import { TEST_USER } from 'utils/testUser';

const doesMealPlanAlreadyExists = async (userId: string, mealPlanName: string) => {
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
    if (await doesMealPlanAlreadyExists(userId, mealPlanName)) {
      return res.status(500).send('Meal plan already exists.');
    } else {
      await createMealPlanHandler(userId, mealPlanName);
      res.status(200).send('Meal plan added successfully.');
    }
  } else if (session.testUser && mealPlanName) {
    if (await doesMealPlanAlreadyExists(TEST_USER, mealPlanName)) {
      return res.status(500).send('Meal plan already exists.');
    } else {
      await createMealPlanHandler(TEST_USER, mealPlanName);
      res.status(200).send('Meal plan added successfully.');
    }
  } else {
    res.status(500).send('Operation failed.');
  }
}
``;
