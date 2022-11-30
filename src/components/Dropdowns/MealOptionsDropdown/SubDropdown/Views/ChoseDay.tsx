import React, { useContext } from 'react';
import * as Styled from '../SubDropdown.styles';
import ArrowSvg from 'assets/SVG/LeftArrow.svg';
import { ViewsContext } from '../SubDropdown';
import { TRANSITIONS } from '../Transitions';

const ChoseDay = () => {
  const { options, setOptions, updateView } = useContext(ViewsContext);

  return (
    <>
      <li>
        <Styled.Label
          onClick={(e) => {
            e.stopPropagation();
            updateView(TRANSITIONS.days.goBackToMealPlans);
          }}
        >
          <ArrowSvg />
          Chose Day:
        </Styled.Label>
      </li>
      {options.days?.length ? (
        options.days.map(({ id, dayName, mealsSections }) => (
          <li key={id}>
            <Styled.Day
              onClick={(e) => {
                e.stopPropagation();
                updateView(TRANSITIONS.days.choseMealsSection);
                setOptions((prevOptions) => ({
                  ...prevOptions,
                  mealsSections,
                }));
              }}
            >
              {dayName}
            </Styled.Day>
          </li>
        ))
      ) : (
        <Styled.Info>You don't have any meals sections in {options.mealPlanName}.</Styled.Info>
      )}
    </>
  );
};

export default ChoseDay;
