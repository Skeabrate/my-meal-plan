import React, { useContext, useEffect } from 'react';
import * as Styled from '../SubDropdown.styles';
import ArrowSvg from 'assets/SVG/LeftArrow.svg';
import { ViewsContext } from '../SubDropdown';
import { TRANSITIONS } from '../Transitions';
import { useMutation } from 'hooks/useMutation';
import { AlertModalContext } from 'context/AlertModalContext';

const ChoseMealsSection = ({ mealId }: { mealId: string }) => {
  const { options, updateView } = useContext(ViewsContext);
  const { openAlertModal } = useContext(AlertModalContext);

  const { mutation: createMealInMealsSection, isLoading: isLoadingCreate } = useMutation(
    '/api/createMealInMealsSection',
    () => {
      updateView(TRANSITIONS.isLoading.addMealToMealsSectionSuccess);
    },
    (err) => {
      openAlertModal('error', err.response?.data);
      updateView(TRANSITIONS.isLoading.addMealToMealsSectionError);
    }
  );

  useEffect(() => {
    if (isLoadingCreate) {
      updateView(TRANSITIONS.mealsSections.addMealToMealsSection);
    }
  }, [isLoadingCreate, updateView]);

  return (
    <>
      <li>
        <Styled.Label
          onClick={(e) => {
            e.stopPropagation();
            updateView(TRANSITIONS.mealsSections.goBackToDays);
          }}
        >
          <ArrowSvg />
          Chose Section:
        </Styled.Label>
      </li>
      {options.mealsSections.length ? (
        options.mealsSections.map(({ id, mealsSectionName }) => (
          <li key={id}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                createMealInMealsSection({
                  mealsSectionId: id,
                  mealId,
                });
              }}
            >
              {mealsSectionName}
            </button>
          </li>
        ))
      ) : (
        <Styled.Info>You don't have any meals sections in chosen day.</Styled.Info>
      )}
    </>
  );
};

export default ChoseMealsSection;
