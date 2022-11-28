import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import * as Styled from './SubDropdown.styles';
import { useFetchMealPlansWithAllDetails } from 'api/pscale/useFetchMealPlansWithAllDetails';
import { useMutation } from 'hooks/useMutation';
import ArrowSvg from 'assets/SVG/LeftArrow.svg';
import Loading from 'components/Loading/Loading';
import { ModalContext } from 'context/ModalContext';
import { MealsSectionType, MealType } from 'types/MealPlanTypes';

const SubDropdown = ({ mealId }: { mealId: string }) => {
  const [displayedItems, setDisplayedItems] = useState<JSX.Element | undefined>();

  const { data: session } = useSession();

  const {
    mealPlansWithAllDetails,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    error: errorFetch,
  } = useFetchMealPlansWithAllDetails();

  const { openModal } = useContext(ModalContext);

  const {
    mutation: createMealInMealsSection,
    isLoading: isLoadingCreate,
    isError: isErrorCreate,
    error: errorCreate,
  } = useMutation('/api/createMealInMealsSection', (data, variables, context) => {
    setDisplayedItems(successHandler(variables.mealPlan));
  });

  useEffect(() => {
    if (mealPlansWithAllDetails?.length) setDisplayedItems(choseMealPlan());
    // eslint-disable-next-line
  }, [mealPlansWithAllDetails]);

  useEffect(() => {
    if (isErrorCreate) openModal('error', errorCreate ? errorCreate : 'An error has occurred.');
  }, [isErrorCreate, errorCreate, openModal]);

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

    const days = mealPlansWithAllDetails?.find(
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

  function choseMealsSection(chosenMealPlan: string, mealsSectionsInChosenDay: MealsSectionType[]) {
    const goBackToDays = (e: React.MouseEvent<HTMLButtonElement>) => {
      updateDisplayedItems(e, () => choseDay(chosenMealPlan));
    };

    const createMealInMealsSectionHandler = (
      e: React.MouseEvent<HTMLButtonElement>,
      mealsSectionId: string,
      meals: MealType[]
    ) => {
      e.stopPropagation();

      if (meals.find((meal) => meal.mealId === mealId)) {
        openModal('error', 'Meal already exists in this meals section.');
      } else {
        createMealInMealsSection({
          mealsSectionId,
          mealId,
          mealPlan: chosenMealPlan,
        });
      }
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
          mealsSectionsInChosenDay.map(({ id, mealsSectionName, meals }) => (
            <li key={id}>
              <button onClick={(e) => createMealInMealsSectionHandler(e, id, meals)}>
                {mealsSectionName}
              </button>
            </li>
          ))
        ) : (
          <Styled.Info>You don't have any meals sections in chosen day.</Styled.Info>
        )}
      </>
    );
  }

  function successHandler(mealPlan: string) {
    return (
      <Styled.Success>
        Meal added to your meal plan!
        <Link href={`/profile/meal-plans/${mealPlan}`}>Go to meal plan</Link>
      </Styled.Success>
    );
  }

  return (
    <Styled.SubDropdown>
      {session ? (
        isLoadingFetch || isLoadingCreate ? (
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
