import React, { useContext, useState } from 'react';
import * as Styled from './CurrentMealPlan.styles';
import { useTabs } from 'hooks/useTabs';
import { MealPlansContext } from '../context/MealPlansContext';
import MealPlan from './MealPlan/MealPlan';
import GoBackButton from 'components/GoBackButton/GoBackButton';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';

const CurrentMealPlan = () => {
  const [activeDaysHelper, setActiveDaysHelper] = useState(0);
  const { currentMealPlan, setCurrentMealPlan, deleteMealPlan } = useContext(MealPlansContext);

  const daysToArray = Object.entries(currentMealPlan!.days);
  const days = daysToArray.map(([key], index) => ({
    id: index,
    label: key,
    Component: (
      <MealPlan activeDay={daysToArray.find((plan, index) => index === activeDaysHelper)![0]} />
    ),
  }));

  const { activeDetails, selectedTab, setActiveDetails } = useTabs(days);

  return (
    <>
      <GoBackButton
        label='Back to meal plans list'
        callback={() => setCurrentMealPlan(undefined)}
      />

      <Styled.MealPlanTitle>
        <h2>{currentMealPlan!.name}</h2>
        <UnderlinedButton
          label='Delete meal plan'
          onClick={() => deleteMealPlan(currentMealPlan!.id)}
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

      <div>{selectedTab}</div>
    </>
  );
};

export default CurrentMealPlan;
