import React, { useContext } from 'react';
import * as Styled from '../SubDropdown.styles';
import ArrowSvg from 'assets/SVG/LeftArrow';
import { DAYS } from 'utils/days';
import { ViewsContext } from '../SubDropdown';
import { TRANSITIONS } from '../Transitions';

const ChoseDay = () => {
  const { options, setOptions, updateView } = useContext(ViewsContext);

  const checkIfDayExists = (day: string) => options.days.find(({ dayName }) => dayName === day);

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
        DAYS.map(({ value, shortened }) => {
          const day = checkIfDayExists(shortened);
          return (
            day && (
              <li key={day.id}>
                <Styled.Day
                  onClick={(e) => {
                    e.stopPropagation();
                    updateView(TRANSITIONS.days.choseMealsSection);
                    setOptions((prevOptions) => ({
                      ...prevOptions,
                      mealsSections: day.mealsSections,
                    }));
                  }}
                >
                  {value}
                </Styled.Day>
              </li>
            )
          );
        })
      ) : (
        <Styled.Info>You don't have any meals sections in {options.mealPlanName}.</Styled.Info>
      )}
    </>
  );
};

export default ChoseDay;
