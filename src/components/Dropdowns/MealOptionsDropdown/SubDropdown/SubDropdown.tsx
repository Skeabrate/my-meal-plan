import React, { useEffect, useState } from 'react';
import * as Styled from './SubDropdown.styles';
import { mealPlansDb } from 'src/pages/profile/meal-plans';

const useFetchFakeMealsDb = () => {
  const [fetchFakeMeals, setFetchFakeMeals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setFetchFakeMeals(mealPlansDb);
      setIsLoading(false);
    }, 500);
  }, []);

  return {
    mealsDb: fetchFakeMeals,
    isLoading,
  };
};

// mealPLansDb - fetch on subDropdown mount
// if session -> meal plans -> days -> meal sections
const SubDropdown = () => {
  const { mealsDb, isLoading } = useFetchFakeMealsDb();
  const [displayedItems, setDisplayedItems] = useState(choseMealPlan());

  function updateDisplayedItems(
    e: React.MouseEvent<HTMLButtonElement>,
    newDisplayedItems: () => React.SetStateAction<JSX.Element>
  ) {
    e.stopPropagation();
    setDisplayedItems(newDisplayedItems());
  }

  function choseMealPlan() {
    return (
      <>
        <li>Chose Meal Plan:</li>
        {isLoading && <p>Loading...</p>}
        {mealPlansDb.map(({ id, name }) => (
          <li key={id}>
            <button onClick={(e) => updateDisplayedItems(e, () => choseDay(name))}>{name}</button>
          </li>
        ))}
      </>
    );
  }

  function choseDay(chosenMealPlan: string) {
    const goBackToMealPlans = (e: React.MouseEvent<HTMLButtonElement>) => {
      updateDisplayedItems(e, () => choseMealPlan());
    };

    const days = Object.entries(
      mealPlansDb.find((mealPlan) => mealPlan.name === chosenMealPlan)!.days
    );

    return (
      <>
        <li>
          <button onClick={goBackToMealPlans}>Chose Day:</button>
        </li>
        {days.map(([day, meals]) => (
          <li key={day}>
            <button
              onClick={(e) =>
                updateDisplayedItems(e, () => choseMealsSection(chosenMealPlan, day, meals))
              }
            >
              {day}
            </button>
          </li>
        ))}
      </>
    );
  }

  const choseMealsSection = (
    chosenMealPlan: string,
    chosenDay: string,
    mealsInChosenDay: any[]
  ) => {
    const goBackToDays = (e: React.MouseEvent<HTMLButtonElement>) => {
      updateDisplayedItems(e, () => choseDay(chosenMealPlan));
    };

    const addMealToMealPlan = (mealPlan: string) => {
      console.log(
        chosenMealPlan,
        chosenDay,
        mealPlan,
        '-> display loading state and modal with success or error info'
      );
    };

    return (
      <>
        <li>
          <button onClick={goBackToDays}>Chose Meals Section:</button>
        </li>
        {mealsInChosenDay.length ? (
          mealsInChosenDay.map(({ mealPlan }) => (
            <li key={mealPlan}>
              <button onClick={() => addMealToMealPlan(mealPlan)}>{mealPlan}</button>
            </li>
          ))
        ) : (
          <li>You don't have any meal plans in chosen day.</li>
        )}
      </>
    );
  };

  return <Styled.SubDropdown>{displayedItems}</Styled.SubDropdown>;
};

export default SubDropdown;
