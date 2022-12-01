import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSession } from 'next-auth/react';

export default async function deleteMealPlan(req: NextApiRequest, res: NextApiResponse) {
  const { mealPlanId } = req.body;
  const session = await getSession({ req });

  if (session && mealPlanId) {
    await prisma.mealPlan.delete({
      where: {
        id: mealPlanId,
      },
    });

    res.status(200).send('Meal plan deleted successfully.');
  } else {
    res.status(500).send('Operation failed.');
  }
}
