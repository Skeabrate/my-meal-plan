import { useState } from 'react';
import Link from 'next/link';
import * as Styled from 'styles/profile/meal-plans/index.styles';
import { useSession } from 'next-auth/react';
import { useCreateMealPlan } from 'api/pscale/MealPlan/useCreateMealPlan';
import { useDeleteMealPlan } from 'api/pscale/MealPlan/useDeleteMealPlan';
import { useFetchMealPlans } from 'api/pscale/useFetchMealPlans';
import PlusSvg from 'assets/SVG/Plus.svg';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayout from 'layouts/ProbileTabLayout/ProbileTabLayout';
import Loading from 'components/Loading/Loading';
import OpenInput from 'components/OpenInput/OpenInput';

const MealPlans = () => {
  const [isAddMealPLanInputOpen, setIsAddMealPLanInputOpen] = useState(false);

  const { data: session } = useSession();

  const { createMealPlan, isLoading: loadingCreatePlan } = useCreateMealPlan();
  const { deleteMealPlan, isLoading: loadingDeletePlan } = useDeleteMealPlan();
  const {
    mealPlans,
    isLoading: loadingMealPlans,
    refetch,
  } = useFetchMealPlans(session?.user.email as string);

  return (
    <ProfileTabLayout label='My Meal Plans:'>
      {isAddMealPLanInputOpen && (
        <OpenInput
          label='Add meal plan'
          placeholder='Meal plan name...'
          updateMealPLans={(inputValue) => {
            createMealPlan(session?.user.email as string, inputValue).then(() => refetch());
            setIsAddMealPLanInputOpen(false);
          }}
        />
      )}

      {loadingMealPlans || loadingCreatePlan || loadingDeletePlan ? (
        <Loading />
      ) : mealPlans?.length ? (
        <Styled.MealPlansList>
          {mealPlans.map(({ id, mealPlanName }, index) => (
            <li key={mealPlanName}>
              <Link href={`/profile/meal-plans/loading/meal-plan?mealPlanName=${mealPlanName}`}>
                <Styled.ListItem>
                  <span>{index < 9 ? `0${index + 1}` : index + 1}:</span>
                  {mealPlanName}
                </Styled.ListItem>
              </Link>

              <Styled.DeleteMealPLanButton
                aria-label='delete meal plan'
                title='Delete meal plan'
                onClick={() => {
                  deleteMealPlan(id).then(() => refetch());
                }}
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
    </ProfileTabLayout>
  );
};

export default MealPlans;

MealPlans.Layout = ProfileLayout;
MealPlans.requireAuth = true;
