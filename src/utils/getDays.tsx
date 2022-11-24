import prisma from 'lib/prismadb';

export const getDays = async (mealPlanId: string) => {
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

  return days;
};
