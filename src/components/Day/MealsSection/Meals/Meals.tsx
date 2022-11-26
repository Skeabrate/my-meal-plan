import * as Styled from './Meals.styles';
import { useFetchMealsFromMealsSection } from 'api/pscale/useFetchMealsFromMealsSection';
import { useMutation } from 'hooks/useMutation';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import Loading from 'components/Loading/Loading';
import Meal from './Meal/Meal';

const Meals = ({ mealsSectionId }: { mealsSectionId: string }) => {
  const { meals, isLoading, refetch, isRefetching, isError, error } =
    useFetchMealsFromMealsSection(mealsSectionId);

  const { mutation: deleteMealFromMealsSection, isLoading: isLoadingDeleteMealFromMealsSection } =
    useMutation('/api/deleteMealFromMealsSection', () => {
      refetch();
    });

  return (
    <div>
      {isLoading || isRefetching || isLoadingDeleteMealFromMealsSection ? (
        <Loading height={155} />
      ) : meals?.length ? (
        <Styled.MealsGrid>
          {meals.map(({ id, mealId }) => (
            <li key={id}>
              <>
                <Meal mealId={mealId} />

                <UnderlinedButton
                  label='Delete'
                  onClick={() => deleteMealFromMealsSection({ mealId: id })}
                />
              </>
            </li>
          ))}
        </Styled.MealsGrid>
      ) : (
        <Styled.Info>You don't have any meals in this meals section.</Styled.Info>
      )}
    </div>
  );
};

export default Meals;
