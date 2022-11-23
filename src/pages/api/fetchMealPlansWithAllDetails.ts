import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';

export default async function fetchMealPlansWithAllDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userEmail = req.query.userEmail;

  if (userEmail && typeof userEmail === 'string') {
    const getMealPlans = await prisma.mealPlan.findMany({
      where: {
        User: {
          email: userEmail,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    let mealPlans = [];

    for await (const { id, mealPlanName } of getMealPlans) {
      let days = [];

      const getDays = await prisma.days.findMany({
        where: {
          mealPlanId: id,
        },
      });

      for await (const { id, dayName } of getDays) {
        const getMealsSections = await prisma.mealsSection.findMany({
          where: {
            daysId: id,
          },
        });

        let mealsSections = [];

        for await (const { id, mealsSectionName } of getMealsSections) {
          const meals = await prisma.meal.findMany({
            where: {
              mealsSectionId: id,
            },
          });

          mealsSections.push({
            id,
            mealsSectionName,
            meals: meals.map(({ id, mealId }) => ({ id, mealId })),
          });
        }

        days.push({
          id,
          dayName,
          mealsSections,
        });
      }

      mealPlans.push({
        id,
        mealPlanName,
        days,
      });
    }

    res.status(200).json(mealPlans);
  } else {
    res.status(500).send({ error: 'Operation failed' });
  }
}
