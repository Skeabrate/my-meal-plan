import React, { useContext, useState } from 'react';
import * as Styled from './CurrentMealPlan.styles';
import { MealPlansContext } from '../context/MealPlansContext';
import { useTabs } from 'hooks/useTabs';
import GoBackButton from 'components/GoBackButton/GoBackButton';
import OpenInput from 'components/OpenInput/OpenInput';

const MealPlan = ({
  activeDay,
  mealPlan,
}: {
  activeDay: string;
  mealPlan: { mealPlan: string; meals: string[] }[];
}) => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  const { currentMealPlan, setMealPlans } = useContext(MealPlansContext);

  const addNewMealSection = (inputValue: string) => {
    setMealPlans((plans) => {
      const newMealPlans = plans.map((plan) => {
        if (plan.id === currentMealPlan?.id) {
          plan.days[activeDay as keyof typeof plan.days].push({
            id: 123,
            mealPlan: inputValue,
            meals: [],
          });

          return plan;
        } else return plan;
      });

      return newMealPlans;
    });

    setIsInputOpen(false);
  };

  return (
    <div>
      <div>
        <Styled.AddMealsSectionButton onClick={() => setIsInputOpen((isOpen) => !isOpen)}>
          Add new meals section
        </Styled.AddMealsSectionButton>

        {isInputOpen && (
          <OpenInput
            label='Add new meal section'
            updateMealPLans={addNewMealSection}
            placeholder='Meals section name...'
          />
        )}
      </div>

      {mealPlan.map(({ mealPlan, meals }) => (
        <div key={mealPlan}>
          <h3>{mealPlan}</h3>
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
  const [activeDaysHelper, setActiveDaysHelper] = useState(0);
  const { currentMealPlan, setCurrentMealPlan, deleteMealPlan } = useContext(MealPlansContext);

  const daysToArray = Object.entries(currentMealPlan!.days);
  const days = daysToArray.map(([key, mealPlan], index) => ({
    id: index,
    label: key,
    Component: (
      <MealPlan
        mealPlan={mealPlan}
        activeDay={daysToArray.find((plan, index) => index === activeDaysHelper)![0]}
      />
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
        <Styled.DeleteButton onClick={() => deleteMealPlan(currentMealPlan!.id)}>
          Delete meal plan
        </Styled.DeleteButton>
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
