import React, { useRef, useState } from 'react';
import * as Styled from './MealPlansList.styles';
import { MealPlan } from '../MealPlans';
import PlusSvg from 'assets/SVG/Plus.svg';

const MealPlansList = ({
  mealPlans,
  setCurrentMealPlan,
  setMealPlans,
}: {
  mealPlans: MealPlan[];
  setCurrentMealPlan: React.Dispatch<React.SetStateAction<undefined | MealPlan>>;
  setMealPlans: React.Dispatch<React.SetStateAction<MealPlan[]>>;
}) => {
  const [isAddMealPLanInputOpen, setIsAddMealPLanInputOpen] = useState(false);

  const inputValue = useRef<HTMLInputElement>(null);

  const addNewMealPlan = (e: any) => {
    e.preventDefault();
    if (inputValue.current?.value) {
      setMealPlans((dbMealPlans) => [...dbMealPlans, { id: 3, name: inputValue.current!.value }]);
      setIsAddMealPLanInputOpen(false);
    }
  };

  const deleteMealPlan = (mealPlanId: number, mealPlanName: string) => {
    if (confirm(`Do you want to delete ${mealPlanName}?`)) {
      setMealPlans((currentMealPlans) => currentMealPlans.filter((i) => i.id !== mealPlanId));
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
                onClick={() => deleteMealPlan(mealPlan.id, mealPlan.name)}
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
