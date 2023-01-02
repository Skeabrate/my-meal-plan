import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { DAYS } from 'utils/days';
import { getSessionHelper } from 'hooks/useSessionHelper';

const checkIfDayNameIsValidFormat = (dayName: string) =>
  DAYS.find(({ shortened }) => shortened === dayName);

const createMealsSectionHandler = async (
  dayId: string,
  dayName: string,
  mealsSectionName: string,
  mealPlanId: string
) => {
  if (dayId) {
    const checkIfMealsSectionExists = await prisma.mealsSection.findFirst({
      where: {
        dayId,
        mealsSectionName,
      },
    });

    if (checkIfMealsSectionExists) {
      return {
        status: 500,
        message: 'Meals section already exists.',
      };
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

      return {
        status: 200,
        message: 'Added meals section to already existed day.',
      };
    }
  } else if (checkIfDayNameIsValidFormat(dayName)) {
    const checkIfDayExistsByName = await prisma.day.findFirst({
      where: {
        mealPlanId,
        dayName,
      },
    });

    if (checkIfDayExistsByName) {
      return {
        status: 500,
        message: 'No dayId provided.',
      };
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

      return {
        status: 200,
        message: 'Added meals section to a new day.',
      };
    }
  } else {
    return {
      status: 500,
      message: 'Something went wrong - day not specified.',
    };
  }
};

export default async function createMealsSection(req: NextApiRequest, res: NextApiResponse) {
  const { mealPlanId, mealsSectionName, dayName, dayId } = req.body;
  const session = await getSessionHelper(req);

  if (session.session && mealPlanId && mealsSectionName) {
    const { status, message } = await createMealsSectionHandler(
      dayId,
      dayName,
      mealsSectionName,
      mealPlanId
    );
    res.status(status).send(message);
  } else if (session.testUser) {
    res.status(500).send('You are not allowed to modify test account meal plans.');
  } else {
    res
      .status(500)
      .send('Something went wrong - meal plan id or meals section name not specified.');
  }
}
