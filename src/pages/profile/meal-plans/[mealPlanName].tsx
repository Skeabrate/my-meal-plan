import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { dehydrate, QueryClient } from 'react-query';
import * as Styled from 'styles/profile/meal-plans/mealPlanName.styles';
import { useTabs } from 'hooks/useTabs';
import { useMutation } from 'hooks/useMutation';
import { DAYS } from 'utils/days';
import { MealPlanType } from 'types/MealPlanTypes';
import { fetchMealPlan, useFetchMealPlan } from 'api/pscale/useFetchMealPlan';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayout from 'layouts/ProbileTabLayout/ProbileTabLayout';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealPlanComponent from 'components/MealPlan/MealPlan';
import Loading from 'components/Loading/Loading';
import OpenInput from 'components/OpenInput/OpenInput';

const MealPlanName = ({ userEmail, mealPlanName }: { userEmail: string; mealPlanName: string }) => {
  const router = useRouter();

  const {
    mealPlan,
    isLoading: isLoadingFetchMealPlan,
    refetch,
    isRefetching,
  } = useFetchMealPlan(userEmail, mealPlanName);

  const [isInputOpen, setIsInputOpen] = useState(false);

  const { mutation: createMealsSection, isLoading: isLoadingCreateMealsSection } = useMutation(
    '/api/createMealsSection',
    () => {
      refetch();
    }
  );

  const { mutation: deleteMealPlan, isLoading: isLoadingDeleteMealPlan } = useMutation(
    '/api/deleteMealPlan',
    () => {
      router.push('/profile/meal-plans');
    }
  );

  const { mutation: deleteMealsSection, isLoading: isLoadingDeleteMealsSection } = useMutation(
    '/api/deleteMealsSection',
    () => {
      refetch();
    }
  );

  const { mutation: deleteMealFromMealsSection, isLoading: isLoadingDeleteMealFromMealsSection } =
    useMutation('/api/deleteMealFromMealsSection', () => {
      refetch();
    });

  const [activeDetailsHelper, setActiveDetailsHelper] = useState(DAYS[0]);

  const activeDayDetails = mealPlan?.days.find(({ dayName }) => dayName === activeDetailsHelper);

  const tabs = DAYS.map((day) => ({
    id: day,
    label: day,
    Component: (
      <MealPlanComponent
        activeDayDetails={activeDayDetails}
        isLoading={isLoadingDeleteMealFromMealsSection || isRefetching}
        deleteMealsSection={deleteMealsSection}
        deleteMealFromMealsSection={deleteMealFromMealsSection}
      />
    ),
  }));
  const { activeDetails, setActiveDetails, selectedTab } = useTabs(tabs);

  return (
    <ProfileTabLayout
      noAnimation
      label='Meal Plan Details:'
    >
      <Styled.MealPlanTitle>
        <h2>{mealPlan?.mealPlanName}</h2>
        <UnderlinedButton
          label='Delete meal plan'
          onClick={() =>
            deleteMealPlan({
              mealPlanId: mealPlan?.id,
            })
          }
        />
      </Styled.MealPlanTitle>

      <Styled.DaysBar>
        {DAYS.map((day) => (
          <li key={day}>
            <Styled.DaysBarButton
              $isActive={day === activeDetails}
              onClick={() => {
                setActiveDetails(day);
                setActiveDetailsHelper(day);
              }}
            >
              {day}
            </Styled.DaysBarButton>
          </li>
        ))}
      </Styled.DaysBar>

      <div style={{ padding: '15px 0 10px' }}>
        <UnderlinedButton
          label='Add new meals section'
          onClick={() => setIsInputOpen((isOpen) => !isOpen)}
          isGreen
        />
      </div>

      {isInputOpen && (
        <OpenInput
          label='Add new meal section'
          updateMealPLans={(inputValue) => {
            createMealsSection({
              mealPlanId: mealPlan?.id,
              mealsSectionName: inputValue,
              activeDayId: activeDayDetails?.id,
              activeDayName: activeDetails,
            });
            setIsInputOpen(false);
          }}
          placeholder='E.g. Breakfast...'
        />
      )}

      {selectedTab}
    </ProfileTabLayout>
  );
};

export default MealPlanName;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const queryClient = new QueryClient();

  const mealPlanName = context.params?.mealPlanName as string;
  const userEmail = session?.user.email as string;

  await queryClient.prefetchQuery('fetchMealPlan', () => fetchMealPlan(userEmail, mealPlanName));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      mealPlanName,
      userEmail,
    },
  };
}

MealPlanName.Layout = ProfileLayout;
MealPlanName.requireAuth = true;
