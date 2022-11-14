import { useState } from 'react';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import * as Styled from 'styles/profile/meal-plans/index.styles';
import OpenInput from 'components/OpenInput/OpenInput';
import PlusSvg from 'assets/SVG/Plus.svg';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayout from 'layouts/ProbileTabLayout/ProbileTabLayout';

export const mealPlansDb = [
  {
    id: 0,
    name: 'Vegetarian',
    days: {
      mon: [
        { id: 0, mealPlan: 'Breakfast', meals: ['52870', '52785', '52971'] },
        { id: 1, mealPlan: 'Dinner', meals: ['53025', '53012'] },
      ],
      tue: [{ id: 2, mealPlan: 'Breakfast', meals: ['53025', '53012'] }],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    },
  },
  {
    id: 1,
    name: 'Cheat Meal',
    days: {
      mon: [
        { id: 0, mealPlan: 'Cheat Breakfast', meals: ['52990', '52768'] },
        { id: 1, mealPlan: 'Cheat Dinner', meals: ['52853', '52989', '52905'] },
        { id: 2, mealPlan: 'Cheat Supper', meals: ['52854'] },
      ],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    },
  },
];

const MealPlans = () => {
  const [isAddMealPLanInputOpen, setIsAddMealPLanInputOpen] = useState(false);

  return (
    <ProfileTabLayout label='My Meal Plans:'>
      {isAddMealPLanInputOpen && (
        <OpenInput
          label='Add meal plan'
          placeholder='Meal plan name...'
          updateMealPLans={(inputValue) => {
            setIsAddMealPLanInputOpen(false);
          }}
        />
      )}

      {mealPlansDb.length ? (
        <Styled.MealPlansList>
          {mealPlansDb.map((mealPlan, index) => (
            <li key={mealPlan.id}>
              <Link href={`/profile/meal-plans/${mealPlan.id}`}>
                <Styled.ListItem>
                  <span>{index < 9 ? `0${index + 1}` : index + 1}:</span>
                  {mealPlan.name}
                </Styled.ListItem>
              </Link>

              <Styled.DeleteMealPLanButton
                aria-label='delete meal plan'
                title='Delete meal plan'
                onClick={() => {}}
              >
                <PlusSvg />
              </Styled.DeleteMealPLanButton>
            </li>
          ))}
        </Styled.MealPlansList>
      ) : (
        <>
          <h3>You don't have any meal plans yet.</h3>
          <p>Add your first meal plan!</p>
        </>
      )}

      <Styled.AddMealPlanButton
        onClick={() => setIsAddMealPLanInputOpen((isInputOpen) => !isInputOpen)}
        aria-label='Add meal plan'
        title='Add meal plan'
        $isAddMealPLanInputOpen={isAddMealPLanInputOpen}
      >
        <PlusSvg />
      </Styled.AddMealPlanButton>
    </ProfileTabLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  } else {
    return {
      props: { session },
    };
  }
}

export default MealPlans;

MealPlans.Layout = ProfileLayout;
