import React, { useContext, useRef, useState } from 'react';
import * as Styled from './MealPlansList.styles';
import { MealPlansContext } from '../context/MealPlansContext';
import PlusSvg from 'assets/SVG/Plus.svg';

const MealPlansList = () => {
  const [isAddMealPLanInputOpen, setIsAddMealPLanInputOpen] = useState(false);
  const { mealPlans, setMealPlans, setCurrentMealPlan, deleteMealPlan } =
    useContext(MealPlansContext);

  const inputValue = useRef<HTMLInputElement>(null);

  const addNewMealPlan = (e: any) => {
    e.preventDefault();

    if (inputValue.current?.value) {
      const newMealPlan = {
        id: 0,
        name: inputValue.current?.value,
        days: {
          mon: [],
          tue: [],
          wed: [],
          thu: [],
          fri: [],
          sat: [],
          sun: [],
        },
      };

      setMealPlans((dbMealPlans) => [...dbMealPlans, newMealPlan]);
      setIsAddMealPLanInputOpen(false);
    }
  };

  return (
    <div>
      {isAddMealPLanInputOpen && (
        <Styled.AddMealPlanForm onSubmit={addNewMealPlan}>
          <Styled.AddMealPlanInput
            aria-label='add meal plan:'
            type='text'
            ref={inputValue}
            required
            maxLength={50}
            placeholder='Meal Plan Name...'
            autoFocus
          />
        </Styled.AddMealPlanForm>
      )}

      {mealPlans.length ? (
        <Styled.MealPlansList>
          {mealPlans.map((mealPlan, index) => (
            <li key={mealPlan.id}>
              <Styled.ListItem onClick={() => setCurrentMealPlan(mealPlan)}>
                <span>{index < 9 ? `0${index + 1}` : index + 1}:</span>
                {mealPlan.name}
              </Styled.ListItem>

              <Styled.DeleteMealPLanButton
                aria-label='delete meal plan'
                title='Delete meal plan'
                onClick={() => deleteMealPlan(mealPlan.id)}
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
    </div>
  );
};

export default MealPlansList;
