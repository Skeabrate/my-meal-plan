import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import * as Styled from './SubDropdown.styles';
import { useFetchMealPlansWithAllDetails } from 'api/pscale/useFetchMealPlansWithAllDetails';
import { useMutation } from 'hooks/useMutation';
import ArrowSvg from 'assets/SVG/LeftArrow.svg';
import Loading from 'components/Loading/Loading';
import { ModalContext } from 'context/ModalContext';
import { MealsSectionType } from 'types/MealPlanTypes';
import { TRANSITIONS } from './Transitions';

const SubDropdown = ({ mealId }: { mealId: string }) => {
  const states = {
    isEmpty: {
      type: 'isEmpty',
      value: () => <></>,
    },
    isLoading: {
      type: 'isLoading',
      value: loadingHandler,
    },
    isError: {
      type: 'isError',
      value: errorHandler,
    },
    mealPlans: {
      type: 'mealPlans',
      value: choseMealPlan,
    },
    days: {
      type: 'days',
      value: choseDay,
    },
    mealsSections: {
      type: 'mealsSections',
      value: choseMealsSection,
    },
    addMealSuccess: {
      type: 'addMealSuccess',
      value: successHandler,
    },
  };

  const transitions = {
    [states.isEmpty.type]: {
      [TRANSITIONS.isEmpty.fetchMealPlans]: states.isLoading,
    },
    [states.isLoading.type]: {
      [TRANSITIONS.isLoading.fetchMealPlansSuccess]: states.mealPlans,
      [TRANSITIONS.isLoading.fetchMealPlansError]: states.isError,
      [TRANSITIONS.isLoading.addMealToMealsSectionSuccess]: states.addMealSuccess,
      [TRANSITIONS.isLoading.addMealToMealsSectionError]: states.mealPlans, // show modal error
    },
    [states.mealPlans.type]: {
      [TRANSITIONS.mealPlans.choseDay]: states.days,
    },
    [states.days.type]: {
      [TRANSITIONS.days.goBackToMealPlans]: states.mealPlans,
      [TRANSITIONS.days.choseMealsSection]: states.mealsSections,
    },
    [states.mealsSections.type]: {
      [TRANSITIONS.mealsSections.goBackToDays]: states.days,
      [TRANSITIONS.mealsSections.addMealToMealsSection]: states.isLoading,
    },
  };

  const [view, setView] = useState(states.isEmpty);

  const updateView = (action: string, params?: any) => {
    setView((currentState) =>
      transitions[currentState.type][action]
        ? {
            type: transitions[currentState.type][action].type,
            value: () => transitions[currentState.type][action].value(params),
          }
        : currentState
    );
  };

  const { data: session } = useSession();
  const { openModal } = useContext(ModalContext);

  const {
    mealPlansWithAllDetails,
    isLoading: isLoadingFetch,
    isRefetching,
    isError: isErrorFetch,
    error: errorFetch,
  } = useFetchMealPlansWithAllDetails();

  const { mutation: createMealInMealsSection, isLoading: isLoadingCreate } = useMutation(
    '/api/createMealInMealsSection',
    (data, variables) => {
      updateView(TRANSITIONS.isLoading.addMealToMealsSectionSuccess, {
        mealPlanName: variables.mealPlanName,
      });
    },
    (err) => {
      openModal('error', err.response?.data);
      updateView(TRANSITIONS.isLoading.addMealToMealsSectionError);
    }
  );

  useEffect(() => {
    if (isLoadingFetch || isRefetching) {
      updateView(TRANSITIONS.isEmpty.fetchMealPlans);
    }
  }, [isLoadingFetch, isRefetching]);

  useEffect(() => {
    if (isErrorFetch) {
      updateView(TRANSITIONS.isLoading.fetchMealPlansError);
      openModal('error', errorFetch);
    }
  }, [isErrorFetch, errorFetch, openModal]);

  useEffect(() => {
    if (mealPlansWithAllDetails?.length) {
      updateView(TRANSITIONS.isLoading.fetchMealPlansSuccess);
    }
  }, [mealPlansWithAllDetails]);

  useEffect(() => {
    if (isLoadingCreate) {
      updateView(TRANSITIONS.mealsSections.addMealToMealsSection);
    }
  }, [isLoadingCreate]);

  function loadingHandler() {
    return <Loading height={100} />;
  }

  function errorHandler() {
    return <>An error has occured.</>;
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateView(TRANSITIONS.mealPlans.choseDay, { chosenMealPlanName: mealPlanName });
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
  }

  function choseDay({ chosenMealPlanName }: { chosenMealPlanName: string }) {
    const daysInChosenMealPlan = mealPlansWithAllDetails?.find(
      ({ mealPlanName }) => mealPlanName === chosenMealPlanName
    )?.days;

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
        {daysInChosenMealPlan?.length ? (
          daysInChosenMealPlan.map(({ id, dayName, mealsSections }) => (
            <li key={id}>
              <Styled.Day
                onClick={(e) => {
                  e.stopPropagation();
                  updateView(TRANSITIONS.days.choseMealsSection, {
                    chosenMealPlanName,
                    mealsSectionsInChosenDay: mealsSections,
                  });
                }}
              >
                {dayName}
              </Styled.Day>
            </li>
          ))
        ) : (
          <Styled.Info>You don't have any meals sections in {chosenMealPlanName}.</Styled.Info>
        )}
      </>
    );
  }

  function choseMealsSection({
    chosenMealPlanName,
    mealsSectionsInChosenDay,
  }: {
    chosenMealPlanName: string;
    mealsSectionsInChosenDay: MealsSectionType[];
  }) {
    return (
      <>
        <li>
          <Styled.Label
            onClick={(e) => {
              e.stopPropagation();
              updateView(TRANSITIONS.mealsSections.goBackToDays, {
                chosenMealPlanName,
              });
            }}
          >
            <ArrowSvg />
            Chose Section:
          </Styled.Label>
        </li>
        {mealsSectionsInChosenDay.length ? (
          mealsSectionsInChosenDay.map(({ id, mealsSectionName }) => (
            <li key={id}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  createMealInMealsSection({
                    mealsSectionId: id,
                    mealId,
                    mealPlanName: chosenMealPlanName,
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
  }

  function successHandler({ mealPlanName }: { mealPlanName: string }) {
    return (
      <Styled.Success>
        Meal added to your meal plan!
        <Link href={`/profile/meal-plans/${mealPlanName}`}>Go to meal plan</Link>
      </Styled.Success>
    );
  }

  return (
    <Styled.SubDropdown>
      {session ? (
        view.value()
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
