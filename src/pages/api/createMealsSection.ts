import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { DAYS } from 'utils/days';

export default async function createMealsSection(req: NextApiRequest, res: NextApiResponse) {
  const mealPlanId = req.query.mealPlanId as string;
  const mealsSectionName = req.query.mealsSectionName as string;
  const activeDayName = req.query.activeDayName as string;
  const activeDayId = req.query.activeDayId as string;

  const checkIfActiveDayIsValidFormat = DAYS.find((day) => day === activeDayName);

  if (mealPlanId && mealsSectionName) {
    if (activeDayId && activeDayId !== 'undefined') {
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
      res.status(500).send({ message: 'Something went wrong.' });
    }
  } else {
    res.status(500).send({ message: 'Something went wrong.' });
  }
}
