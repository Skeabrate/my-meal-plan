import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';
import { TEST_USER } from 'utils/testUser';

const deleteMealPlanHandler = async (mealPlanId: string) => {
  await prisma.mealPlan.delete({
    where: {
      id: mealPlanId,
    },
  });
};

export default async function deleteMealPlan(req: NextApiRequest, res: NextApiResponse) {
  const { mealPlanId } = req.body;
  const session = await getSessionHelper(req);

  if (session.session && mealPlanId) {
    await deleteMealPlanHandler(mealPlanId);

    res.status(200).send('Meal plan deleted successfully.');
  } else if (session.testUser && mealPlanId) {
    const checkTestUserMealPlan = await prisma.mealPlan.findFirst({
      where: {
        userId: TEST_USER,
        id: mealPlanId,
      },
    });

    if (checkTestUserMealPlan) {
      await deleteMealPlanHandler(mealPlanId);
    } else {
      res.status(500).send('You are not allowed to delete this meal plan.');
    }

    res.status(200).send('Meal plan deleted successfully.');
  } else {
    res.status(500).send('Operation failed.');
  }
}
