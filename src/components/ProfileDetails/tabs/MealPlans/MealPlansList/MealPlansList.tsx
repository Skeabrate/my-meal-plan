import React, { useRef, useState } from 'react';
import { MealPlan } from '../MealPlans';

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
      setCurrentMealPlan({ id: 3, name: inputValue.current!.value });
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
          />
          <input
            type='submit'
            value='Submit'
          />
        </form>
      )}

      {mealPlans.length ? (
        <ul>
          {mealPlans.map((mealPlan) => (
            <li
              key={mealPlan.id}
              onClick={() => setCurrentMealPlan(mealPlan)}
            >
              {mealPlan.name}
            </li>
          ))}
        </ul>
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
