import React, { useRef, useState } from 'react';
import { MealPlan } from '../MealPlans';
import * as Styled from './MealPlansList.styles';

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

  return (
    <div>
      {isAddMealPLanInputOpen && (
        <form onSubmit={addNewMealPlan}>
          <input
            aria-label='add meal plan:'
            type='text'
            ref={inputValue}
            required
            maxLength={50}
          />
          <input
            type='submit'
            value='Submit'
          />
        </form>
      )}

      {mealPlans.length ? (
        <Styled.MealPlansList>
          {mealPlans.map((mealPlan, index) => (
            <li key={mealPlan.id}>
              <Styled.ListItem onClick={() => setCurrentMealPlan(mealPlan)}>
                <span>{index < 9 ? `0${index + 1}` : index + 1}:</span>
                {mealPlan.name}
              </Styled.ListItem>

              <Styled.OptionsButton onClick={() => console.log('options')}>
                opts
              </Styled.OptionsButton>
            </li>
          ))}
        </Styled.MealPlansList>
      ) : (
        <>
          <h3>You don't have any meal plans yet.</h3>
          <p>Add your first meal plan!</p>
        </>
      )}

      <button onClick={() => setIsAddMealPLanInputOpen(true)}>Add meal plan</button>
    </div>
  );
};

export default MealPlansList;