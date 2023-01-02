import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';
import { TEST_USER } from 'utils/testUser';

const getMealPlansDetails = async (userId: string) => {
  const getMealPlans = await prisma.mealPlan.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  let mealPlans = [];

  for await (const { id: mealPlanId, mealPlanName } of getMealPlans) {
    let days = [];

    const daysInCurrentMealPlan = await prisma.day.findMany({
      where: {
        mealPlanId,
      },
    });

    for await (const { id: dayId, dayName } of daysInCurrentMealPlan) {
      const mealsSectionsInCurrentMealPlan = await prisma.mealsSection.findMany({
        where: {
          dayId,
        },
      });

      let mealsSections = [];

      for await (const { id, mealsSectionName } of mealsSectionsInCurrentMealPlan) {
        const mealsInCurrentMealPlan = await prisma.meal.findMany({
          where: {
            mealsSectionId: id,
          },
        });

        mealsSections.push({
          id,
          mealsSectionName,
          meals: mealsInCurrentMealPlan.map(({ id, mealId }) => ({ id, mealId })),
        });
      }

      days.push({
        id: dayId,
        dayName,
        mealsSections,
      });
    }

    mealPlans.push({
      id: mealPlanId,
      mealPlanName,
      days,
    });
  }

  return mealPlans;
};

export default async function fetchMealPlansWithAllDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;
  const session = await getSessionHelper(req);

  if (session.session && userId) {
    const mealPlans = await getMealPlansDetails(userId);

    res.status(200).json(mealPlans);
  } else if (session.testUser) {
    const mealPlans = await getMealPlansDetails(TEST_USER);

    res.status(200).json(mealPlans);
  } else {
    res.status(500).send('Operation failed');
  }
}
