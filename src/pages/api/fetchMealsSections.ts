import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';
import { TEST_USER } from 'utils/testUser';

export default async function fetchMealsSections(req: NextApiRequest, res: NextApiResponse) {
  const { dayName, mealPlanId } = req.body;
  const session = await getSessionHelper(req);

  if (session.session && dayName && mealPlanId) {
    const mealsSections = await prisma.mealsSection.findMany({
      where: {
        Day: {
          mealPlanId,
          dayName,
        },
      },
    });
    res.status(200).json(mealsSections);
  } else if (session.testUser && dayName && mealPlanId) {
    const testUserMealsSections = await prisma.mealsSection.findMany({
      where: {
        Day: {
          MealPlan: {
            userId: TEST_USER,
          },
          mealPlanId,
          dayName,
        },
      },
    });
    res.status(200).json(testUserMealsSections);
  } else {
    res.status(500).send('Operation failed');
  }
}
