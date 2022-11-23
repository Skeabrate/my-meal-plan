import prisma from 'lib/prismadb';

export const getDays = async (mealPlanId: string) => {
  let days = [];

  const daysInCurrentMealPlan = await prisma.days.findMany({
    where: {
      mealPlanId,
    },
  });

  for await (const { id: daysId, dayName } of daysInCurrentMealPlan) {
    const mealsSectionsInCurrentMealPlan = await prisma.mealsSection.findMany({
      where: {
        daysId,
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
      id: daysId,
      dayName,
      mealsSections,
    });
  }

  return days;
};
