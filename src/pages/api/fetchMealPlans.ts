import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prismadb';
import { getSessionHelper } from 'hooks/useSessionHelper';
import { TEST_USER } from 'utils/testUser';

const mealPlansHandler = async (userId: string) => {
  return await prisma.mealPlan.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};

export default async function fetchMealPlans(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;
  const session = await getSessionHelper(req);

  if (session.session && userId) {
    res.status(200).json(await mealPlansHandler(userId));
  } else if (session.testUser) {
    res.status(200).json(await mealPlansHandler(TEST_USER));
  } else {
    res.status(500).send('Operation failed.');
  }
}
