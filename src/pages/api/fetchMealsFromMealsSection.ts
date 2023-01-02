import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';
import { TEST_USER } from 'utils/testUser';

export default async function fetchMealsFromMealsSection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { mealsSectionId } = req.body;
  const session = await getSessionHelper(req);

  if (session.session && mealsSectionId) {
    const meals = await prisma.meal.findMany({
      where: {
        mealsSectionId,
      },
    });

    res.status(200).json(meals);
  } else if (session.testUser && mealsSectionId) {
    const testUserMeals = await prisma.meal.findMany({
      where: {
        MealsSection: {
          Day: {
            MealPlan: {
              userId: TEST_USER,
            },
          },
        },
        mealsSectionId,
      },
    });

    res.status(200).json(testUserMeals);
  } else {
    res.status(500).send('Operation failed.');
  }
}
