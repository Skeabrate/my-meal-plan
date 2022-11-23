import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import * as Styled from './SubDropdown.styles';
import Loading from 'components/Loading/Loading';
import ArrowSvg from 'assets/SVG/LeftArrow.svg';
import { useFetchMealPlansWithAllDetails } from 'api/pscale/useFetchMealPlansWithAllDetails';
import axios from 'axios';

const SubDropdown = ({ mealId }: { mealId: string }) => {
  const { mealPlansWithAllDetails, isLoading, error } = useFetchMealPlansWithAllDetails();

  const { data: session } = useSession();
  const [displayedItems, setDisplayedItems] = useState<JSX.Element | undefined>();

  useEffect(() => {
    if (mealPlansWithAllDetails?.length) setDisplayedItems(choseMealPlan());
    // eslint-disable-next-line
  }, [mealPlansWithAllDetails]);

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
        {mealPlansWithAllDetails?.length ? (
          mealPlansWithAllDetails.map(({ id, mealPlanName }) => (
            <li key={id}>
              <button onClick={(e) => updateDisplayedItems(e, () => choseDay(mealPlanName))}>
                {mealPlanName}
              </button>
            </li>
          ))
        ) : (
          <Styled.Info>You don't have any meal plans yet.</Styled.Info>
        )}
      </>
    );
  }

  function choseDay(chosenMealPlan: string) {
    const goBackToMealPlans = (e: React.MouseEvent<HTMLButtonElement>) => {
      updateDisplayedItems(e, () => choseMealPlan());
    };

    const days = mealPlansWithAllDetails.find(
      ({ mealPlanName }) => mealPlanName === chosenMealPlan
    )?.days;

    return (
      <>
        <li>
          <Styled.Label onClick={goBackToMealPlans}>
            <ArrowSvg />
            Chose Day:
          </Styled.Label>
        </li>
        {days?.length ? (
          days.map(({ id, dayName, mealsSections }) => (
            <li key={id}>
              <Styled.Day
                onClick={(e) =>
                  updateDisplayedItems(e, () => choseMealsSection(chosenMealPlan, mealsSections))
                }
              >
                {dayName}
              </Styled.Day>
            </li>
          ))
        ) : (
          <Styled.Info>You don't have any meals sections in {chosenMealPlan}.</Styled.Info>
        )}
        {}
      </>
    );
  }

  function choseMealsSection(chosenMealPlan: string, mealsSectionsInChosenDay: any[]) {
    const goBackToDays = (e: React.MouseEvent<HTMLButtonElement>) => {
      updateDisplayedItems(e, () => choseDay(chosenMealPlan));
    };

    const addMealToMealsSectionHandler = async (chosenMealsSectionId: string) => {
      await axios({
        method: 'post',
        url: '/api/addMealToMealsSection',
        data: {
          mealsSectionId: chosenMealsSectionId,
          mealId,
        },
      });
    };

    return (
      <>
        <li>
          <Styled.Label onClick={goBackToDays}>
            <ArrowSvg />
            Chose Section:
          </Styled.Label>
        </li>
        {mealsSectionsInChosenDay.length ? (
          mealsSectionsInChosenDay.map(({ id, mealsSectionName }) => (
            <li key={id}>
              <button onClick={() => addMealToMealsSectionHandler(id)}>{mealsSectionName}</button>
            </li>
          ))
        ) : (
          <Styled.Info>You don't have any meals sections in chosen day.</Styled.Info>
        )}
      </>
    );
  }

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
