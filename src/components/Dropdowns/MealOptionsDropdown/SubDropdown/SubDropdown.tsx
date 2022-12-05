// State Machine
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import * as Styled from './SubDropdown.styles';
import { useFetchMealPlansWithAllDetails } from 'api/pscale/useFetchMealPlansWithAllDetails';
import { AlertModalContext } from 'context/AlertModalContext';
import { DayType, MealPlanType, MealsSectionType } from 'types/MealPlanTypes';
import { ROUTES } from 'utils/routes';
import { TRANSITIONS } from './Transitions';
import IsLoading from './Views/IsLoading';
import IsError from './Views/IsError';
import ChoseMealPlan from './Views/ChoseMealPlan';
import ChoseDay from './Views/ChoseDay';
import ChoseMealsSection from './Views/ChoseMealsSection';
import Success from './Views/Success';

type OptionsType = {
  mealPlanName: string;
  days: DayType[];
  mealsSections: MealsSectionType[];
};

export const ViewsContext = React.createContext(
  {} as {
    mealPlansWithAllDetails: MealPlanType[] | undefined;
    updateView: (action: string) => void;
    options: OptionsType;
    setOptions: React.Dispatch<React.SetStateAction<OptionsType>>;
  }
);

const SubDropdown = ({ mealId }: { mealId: string }) => {
  const states = useMemo(
    () => ({
      isEmpty: {
        type: 'isEmpty',
        Component: <></>,
      },
      isLoading: {
        type: 'isLoading',
        Component: <IsLoading />,
      },
      isError: {
        type: 'isError',
        Component: <IsError />,
      },
      mealPlans: {
        type: 'mealPlans',
        Component: <ChoseMealPlan />,
      },
      days: {
        type: 'days',
        Component: <ChoseDay />,
      },
      mealsSections: {
        type: 'mealsSections',
        Component: <ChoseMealsSection mealId={mealId} />,
      },
      addMealSuccess: {
        type: 'addMealSuccess',
        Component: <Success />,
      },
    }),
    [mealId]
  );

  const transitions = useMemo(
    () => ({
      [states.isEmpty.type]: {
        [TRANSITIONS.isEmpty.fetchMealPlans]: states.isLoading,
        [TRANSITIONS.isEmpty.refetchMealPlans]: states.isLoading,
      },
      [states.isLoading.type]: {
        [TRANSITIONS.isLoading.fetchMealPlansSuccess]: states.mealPlans,
        [TRANSITIONS.isLoading.fetchMealPlansError]: states.isError,
        [TRANSITIONS.isLoading.addMealToMealsSectionSuccess]: states.addMealSuccess,
        [TRANSITIONS.isLoading.addMealToMealsSectionError]: states.mealsSections, // show modal error
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
    }),
    [states]
  );

  const [view, setView] = useState(states.isEmpty);
  const [options, setOptions] = useState<OptionsType>({
    mealPlanName: '',
    days: [],
    mealsSections: [],
  });

  const updateView = useCallback(
    (action: string) => {
      setView((currentState) => transitions[currentState.type][action] || currentState);
    },
    [transitions]
  );

  const {
    mealPlansWithAllDetails,
    isLoading: isLoadingFetch,
    isRefetching,
    isError: isErrorFetch,
    error: errorFetch,
  } = useFetchMealPlansWithAllDetails();

  const { data: session } = useSession();
  const { openAlertModal } = useContext(AlertModalContext);

  useEffect(() => {
    if (isLoadingFetch) {
      updateView(TRANSITIONS.isEmpty.fetchMealPlans);
    }
  }, [isLoadingFetch, updateView]);

  useEffect(() => {
    if (isErrorFetch) {
      updateView(TRANSITIONS.isLoading.fetchMealPlansError);
      openAlertModal('error', errorFetch);
    }
  }, [isErrorFetch, errorFetch, openAlertModal, updateView]);

  useEffect(() => {
    if (isRefetching) {
      updateView(TRANSITIONS.isEmpty.refetchMealPlans);
    } else if (mealPlansWithAllDetails) {
      updateView(TRANSITIONS.isLoading.fetchMealPlansSuccess);
    }
  }, [isRefetching, mealPlansWithAllDetails, updateView]);

  return (
    <Styled.SubDropdown>
      {session ? (
        <ViewsContext.Provider
          value={{
            mealPlansWithAllDetails,
            updateView,
            options,
            setOptions,
          }}
        >
          {view.Component}
        </ViewsContext.Provider>
      ) : (
        <Styled.Info>
          <Link href={ROUTES.profile.signIn}>Log in</Link>
          to see your meal plans.
        </Styled.Info>
      )}
    </Styled.SubDropdown>
  );
};

export default SubDropdown;
