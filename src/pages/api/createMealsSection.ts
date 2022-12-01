import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { DAYS } from 'utils/days';
import { getSession } from 'next-auth/react';

export default async function createMealsSection(req: NextApiRequest, res: NextApiResponse) {
  const { mealPlanId, mealsSectionName, dayName, dayId } = req.body;
  const session = await getSession({ req });

  const checkIfDayNameIsValidFormat = DAYS.find(({ shortened }) => shortened === dayName);

  if (session && mealPlanId && mealsSectionName) {
    if (dayId) {
      const checkIfMealsSectionExists = await prisma.mealsSection.findFirst({
        where: {
          dayId,
          mealsSectionName,
        },
      });

      if (checkIfMealsSectionExists) {
        res.status(500).send('Meals section already exists.');
      } else {
        await prisma.day.update({
          where: {
            id: dayId,
          },
          data: {
            MealsSections: {
              create: {
                mealsSectionName,
              },
            },
          },
        });

        res.status(200).send('Added meals section to already existed day.');
      }
    } else if (checkIfDayNameIsValidFormat) {
      const checkIfDayExistsByName = await prisma.day.findFirst({
        where: {
          mealPlanId,
          dayName,
        },
      });

      if (checkIfDayExistsByName) {
        res.status(500).send('No dayId provided');
      } else {
        await prisma.day.create({
          data: {
            mealPlanId,
            dayName,
            MealsSections: {
              create: {
                mealsSectionName,
              },
            },
          },
        });

        res.status(200).send('Added meals section to a new day.');
      }
    } else {
      res.status(500).send('Something went wrong - day not specified.');
    }
  } else {
    res
      .status(500)
      .send('Something went wrong - meal plan id or meals section name not specified.');
  }
}
