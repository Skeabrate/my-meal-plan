import React, { useContext } from 'react';
import * as Styled from './CurrentMealPlan.styles';
import { MealPlansContext } from '../context/MealPlansContext';
import GoBackButton from 'components/GoBackButton/GoBackButton';
import { useTabs } from 'hooks/useTabs';

const MealPlan = ({ mealPlan }: { mealPlan: { mealPlan: string; meals: string[] }[] }) => {
  return (
    <div>
      {mealPlan.map(({ mealPlan, meals }) => (
        <div key={mealPlan}>
          <p>{mealPlan}</p>
          <ul>
            {meals.map((mealId) => (
              <li key={mealId}>{mealId}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const CurrentMealPlan = () => {
  const { currentMealPlan, setCurrentMealPlan, deleteMealPlan } = useContext(MealPlansContext);
  const days = Object.entries(currentMealPlan!.days).map(([key, mealPlan], index) => ({
    id: index,
    label: key,
    Component: <MealPlan mealPlan={mealPlan} />,
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
        <Styled.DeleteButton onClick={() => deleteMealPlan(currentMealPlan!.id)}>
          Delete meal plan
        </Styled.DeleteButton>
      </Styled.MealPlanTitle>

      <Styled.DaysBar>
        {days.map(({ id, label }) => (
          <li key={id}>
            <Styled.DaysBarButton
              $isActive={id === activeDetails}
              onClick={() => setActiveDetails(id)}
            >
              {label}
            </Styled.DaysBarButton>
          </li>
        ))}
      </Styled.DaysBar>

      <p>{selectedTab}</p>
    </>
  );
};

export default CurrentMealPlan;
