import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import * as Styled from './SubDropdown.styles';
import { mealPlansDb } from 'src/pages/profile/meal-plans';
import Loading from 'components/Loading/Loading';
import ArrowSvg from 'assets/SVG/LeftArrow.svg';

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

const SubDropdown = ({ mealId }: { mealId: string }) => {
  const { mealsDb, isLoading } = useFetchFakeMealsDb();
  const { data: session } = useSession();
  const [displayedItems, setDisplayedItems] = useState<JSX.Element | undefined>();

  function updateDisplayedItems(
    e: React.MouseEvent<HTMLButtonElement>,
    newDisplayedItems: () => React.SetStateAction<JSX.Element | undefined>
  ) {
    e.stopPropagation();
    setDisplayedItems(newDisplayedItems());
  }

  function choseMealPlan() {
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
        {mealsDb.map(({ id, name: mealPlanName }) => (
          <li key={id}>
            <button onClick={(e) => updateDisplayedItems(e, () => choseDay(mealPlanName))}>
              {mealPlanName}
            </button>
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
          <Styled.Label onClick={goBackToMealPlans}>
            <ArrowSvg />
            Chose Day:
          </Styled.Label>
        </li>
        {days.map(([day, mealsInCurrentDay]) => (
          <li key={day}>
            <Styled.Day
              onClick={(e) =>
                updateDisplayedItems(e, () =>
                  choseMealsSection(chosenMealPlan, day, mealsInCurrentDay)
                )
              }
            >
              {day}
            </Styled.Day>
          </li>
        ))}
      </>
    );
  }

  function choseMealsSection(chosenMealPlan: string, chosenDay: string, mealsInChosenDay: any[]) {
    const goBackToDays = (e: React.MouseEvent<HTMLButtonElement>) => {
      updateDisplayedItems(e, () => choseDay(chosenMealPlan));
    };

    const addMealToMealPlan = (chosenMealsSection: string) => {
      console.log(`Add ${mealId} to ${chosenMealPlan} -> ${chosenDay} -> ${chosenMealsSection}`);
    };

    return (
      <>
        <li>
          <Styled.Label onClick={goBackToDays}>
            <ArrowSvg />
            Chose Section:
          </Styled.Label>
        </li>
        {mealsInChosenDay.length ? (
          mealsInChosenDay.map(({ mealPlan: mealsSection }) => (
            <li key={mealsSection}>
              <button onClick={() => addMealToMealPlan(mealsSection)}>{mealsSection}</button>
            </li>
          ))
        ) : (
          <Styled.Info>You don't have any meal plans in chosen day.</Styled.Info>
        )}
      </>
    );
  }

  useEffect(() => {
    if (mealsDb.length) setDisplayedItems(choseMealPlan());
    // eslint-disable-next-line
  }, [mealsDb]);

  return (
    <Styled.SubDropdown>
      {session ? (
        isLoading ? (
          <Loading height={100} />
        ) : (
          displayedItems
        )
      ) : (
        <Styled.Info>
          <Link href='/api/auth/signin'>Log in</Link>
          to see your meal plans.
        </Styled.Info>
      )}
    </Styled.SubDropdown>
  );
};

export default SubDropdown;
