import React, { useContext } from 'react';
import * as Styled from '../SubDropdown.styles';
import { ViewsContext } from '../SubDropdown';
import { TRANSITIONS } from '../Transitions';

const ChoseMealPlan = () => {
  const { mealPlansWithAllDetails, updateView, setOptions } = useContext(ViewsContext);

  return (
    <>
      <li>
        <Styled.Label
          $isDisabled
          disabled
        >
          Chose Meal Plan:
        </Styled.Label>
      </li>
      {mealPlansWithAllDetails?.length ? (
        mealPlansWithAllDetails.map(({ id, mealPlanName, days }) => (
          <li key={id}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateView(TRANSITIONS.mealPlans.choseDay);
                setOptions({
                  mealPlanName,
                  days,
                  mealsSections: [],
                });
              }}
            >
              {mealPlanName}
            </button>
          </li>
        ))
      ) : (
        <Styled.Info>You don't have any meal plans yet.</Styled.Info>
      )}
    </>
  );
};

export default ChoseMealPlan;
