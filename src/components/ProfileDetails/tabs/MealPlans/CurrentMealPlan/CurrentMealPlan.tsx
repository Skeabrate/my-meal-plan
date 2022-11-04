import React, { useContext } from 'react';
import * as Styled from './CurrentMealPlan.styles';
import { MealPlansContext } from '../context/MealPlansContext';
import GoBackButton from 'components/GoBackButton/GoBackButton';

const CurrentMealPlan = () => {
  const { currentMealPlan, setCurrentMealPlan, deleteMealPlan } = useContext(MealPlansContext);

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

      <p>monday tuesday</p>
    </>
  );
};

export default CurrentMealPlan;
