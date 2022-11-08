import React, { useContext, useEffect, useState } from 'react';
import * as Styled from './MealPlansList.styles';
import { useRouter } from 'next/router';
import { MealPlansContext } from '../context/MealPlansContext';
import PlusSvg from 'assets/SVG/Plus.svg';
import OpenInput from 'components/OpenInput/OpenInput';
import { useMealPlanPathChange } from '../hooks/useMealPlanPathChange';

const MealPlansList = () => {
  const [isAddMealPLanInputOpen, setIsAddMealPLanInputOpen] = useState(false);
  const { mealPlans, setMealPlans, deleteMealPlan } = useContext(MealPlansContext);

  const router = useRouter();
  useMealPlanPathChange();

  const addNewMealPlan = (inputValue: string) => {
    if (inputValue) {
      const newMealPlan = {
        id: 3,
        name: inputValue,
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
        <OpenInput
          label='Add meal plan'
          placeholder='Meal plan name...'
          updateMealPLans={addNewMealPlan}
        />
      )}

      {mealPlans.length ? (
        <Styled.MealPlansList>
          {mealPlans.map((mealPlan, index) => (
            <li key={mealPlan.id}>
              <Styled.ListItem
                onClick={() => {
                  router.push({
                    query: { ...router.query, planId: mealPlan.id },
                  });
                }}
              >
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
