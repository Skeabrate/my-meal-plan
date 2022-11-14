import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import * as Styled from 'styles/profile/meal-plans/mealPlanId.styles';
import { useTabs } from 'hooks/useTabs';
import ProfileTabLayout from 'layouts/ProbileTabLayout/ProbileTabLayout';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealPlan from 'components/MealPlan/MealPlan';
import { mealPlansDb } from './index';

const MealPlanId = ({ mealPlanId }: { mealPlanId: number }) => {
  const currentMealPlan = mealPlansDb[mealPlanId];
  const daysToArray = Object.entries(currentMealPlan.days);
  const firstDay = daysToArray[0][0];

  const [activeDaysHelper, setActiveDaysHelper] = useState(firstDay);

  const days = daysToArray.map(([key]) => ({
    id: key,
    label: key,
    Component: (
      <MealPlan
        activeDay={activeDaysHelper}
        mealPlansInCurrentDay={
          currentMealPlan.days[activeDaysHelper as keyof typeof currentMealPlan.days]
        }
      />
    ),
  }));

  const { activeDetails, selectedTab, setActiveDetails } = useTabs(days);

  return (
    <ProfileTabLayout label='Meal Plan Details:'>
      <Styled.MealPlanTitle>
        <h2>{currentMealPlan!.name}</h2>
        <UnderlinedButton
          label='Delete meal plan'
          onClick={() => {}}
        />
      </Styled.MealPlanTitle>

      <Styled.DaysBar>
        {days.map(({ id, label }) => (
          <li key={id}>
            <Styled.DaysBarButton
              $isActive={id === activeDetails}
              onClick={() => {
                setActiveDetails(id);
                setActiveDaysHelper(id);
              }}
            >
              {label}
            </Styled.DaysBarButton>
          </li>
        ))}
      </Styled.DaysBar>

      {/* MealPlan */}
      {selectedTab}
    </ProfileTabLayout>
  );
};

export default MealPlanId;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const mealPlanId = context.params?.mealPlanId;

  return {
    props: {
      mealPlanId,
    },
  };
}

MealPlanId.Layout = ProfileLayout;
MealPlanId.requireAuth = true;
