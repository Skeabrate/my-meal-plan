import { useContext, useState } from 'react';
import * as Styled from './MealPlansList.styles';
import { MealPlansContext } from 'context/MealPlansContext';
import { useMealPlanPathChange } from '../../../hooks/useMealPlanPathChange';
import PlusSvg from 'assets/SVG/Plus.svg';
import OpenInput from 'components/OpenInput/OpenInput';
import Loading from 'components/Loading/Loading';

const MealPlansList = () => {
  const [isAddMealPLanInputOpen, setIsAddMealPLanInputOpen] = useState(false);
  const { mealPlans, addNewMealPlan, deleteMealPlan } = useContext(MealPlansContext);

  const { loadingMealPlan, changeMealPlanPath } = useMealPlanPathChange();

  return loadingMealPlan ? (
    <Loading />
  ) : (
    <>
      {isAddMealPLanInputOpen && (
        <OpenInput
          label='Add meal plan'
          placeholder='Meal plan name...'
          updateMealPLans={(inputValue) => {
            addNewMealPlan(inputValue);
            setIsAddMealPLanInputOpen(false);
          }}
        />
      )}

      {mealPlans.length ? (
        <Styled.MealPlansList>
          {mealPlans.map((mealPlan, index) => (
            <li key={mealPlan.id}>
              <Styled.ListItem onClick={() => changeMealPlanPath(mealPlan.id)}>
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
    </>
  );
};

export default MealPlansList;
