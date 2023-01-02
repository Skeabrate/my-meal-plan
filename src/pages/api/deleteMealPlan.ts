import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';

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
  } else if (session.testUser) {
    res.status(500).send('You are not allowed to modify test account meal plans.');
  } else {
    res.status(500).send('Operation failed.');
  }
}
