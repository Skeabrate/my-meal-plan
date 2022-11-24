import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { DAYS } from 'utils/days';

export default async function createMealsSection(req: NextApiRequest, res: NextApiResponse) {
  const { mealPlanId, mealsSectionName, activeDayName, activeDayId } = req.body;

  const checkIfActiveDayIsValidFormat = DAYS.find((day) => day === activeDayName);

  if (mealPlanId && mealsSectionName) {
    if (activeDayId) {
      const checkIfDayExistsById = await prisma.day.findFirst({
        where: {
          id: activeDayId,
        },
      });

      if (checkIfDayExistsById) {
        const checkIfMealsSectionExists = await prisma.mealsSection.findFirst({
          where: {
            dayId: activeDayId,
            mealsSectionName,
          },
        });

        if (checkIfMealsSectionExists) {
          res.status(500).send('Meals section already exists.');
        } else {
          await prisma.mealsSection.create({
            data: {
              dayId: activeDayId,
              mealsSectionName,
            },
          });

          res.status(200).send('Added meals section to already existed day.');
        }
      } else {
        res.status(500).send('Wrong dayId.');
      }
    } else if (checkIfActiveDayIsValidFormat) {
      const checkIfDayExistsByName = await prisma.day.findFirst({
        where: {
          mealPlanId: mealPlanId,
          dayName: activeDayName,
        },
      });

      if (checkIfDayExistsByName) {
        res.status(500).send('No dayId provided');
      } else {
        await prisma.day.create({
          data: {
            mealPlanId,
            dayName: activeDayName,
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
