import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function deleteMealPlan(req: NextApiRequest, res: NextApiResponse) {
  const { mealPlanId } = req.body;

  if (mealPlanId) {
    await prisma.mealPlan.delete({
      where: {
        id: mealPlanId,
      },
    });

    res.status(200).send({ message: 'Meal plan deleted successfully' });
  } else {
    res.status(500).send({ error: 'Operation failed' });
  }
}
