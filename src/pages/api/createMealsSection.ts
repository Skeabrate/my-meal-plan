import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { DAYS } from 'utils/days';

export default async function createMealsSection(req: NextApiRequest, res: NextApiResponse) {
  const { mealPlanId, mealsSectionName, activeDayName, activeDayId } = req.body;

  const checkIfActiveDayIsValidFormat = DAYS.find((day) => day === activeDayName);

  if (mealPlanId && mealsSectionName) {
    if (activeDayId) {
      const checkIfDayExistsById = await prisma.days.findFirst({
        where: {
          id: activeDayId,
        },
      });

      if (checkIfDayExistsById) {
        const checkIfMealsSectionExists = await prisma.mealsSection.findFirst({
          where: {
            daysId: activeDayId,
            mealsSectionName,
          },
        });

        if (checkIfMealsSectionExists) {
          res.status(500).send({ message: 'Meals section already exists.' });
        } else {
          await prisma.mealsSection.create({
            data: {
              daysId: activeDayId,
              mealsSectionName,
            },
          });

          res.status(200).send({ message: 'Added meals section to already existed day.' });
        }
      } else {
        res.status(500).send({ message: 'Wrong dayId.' });
      }
    } else if (checkIfActiveDayIsValidFormat) {
      const checkIfDayExistsByName = await prisma.days.findFirst({
        where: {
          mealPlanId: mealPlanId,
          dayName: activeDayName,
        },
      });

      if (checkIfDayExistsByName) {
        res.status(500).send({ message: 'No dayId provided' });
      } else {
        await prisma.days.create({
          data: {
            mealPlanId,
            dayName: activeDayName,
            MealsSection: {
              create: {
                mealsSectionName,
              },
            },
          },
        });

        res.status(200).send({ message: 'Added meals section to new day.' });
      }
    } else {
      res.status(500).send({ message: 'Something went wrong - day not specified.' });
    }
  } else {
    res.status(500).send({
      message: 'Something went wrong - meal plan id or meals section name not specified.',
    });
  }
}
