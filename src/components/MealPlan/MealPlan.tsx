import { useFetchMealsFromMealsSections } from 'api/mealdb/useFetchMealsFromMealsSections';
import { DayType, MealPlanType } from 'types/MealPlanTypes';
import { useMutation } from 'hooks/useMutation';
import * as Styled from './MealPlan.styles';
import MealsSectionOptionsDropdown from 'components/Dropdowns/MealsSectionOptionsDropdown';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import Image from 'next/image';
import Link from 'next/link';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import { MealType } from 'types/MealType';
import Loading from 'components/Loading/Loading';

const MealPlan = ({
  activeDayDetails,
  isLoading,
  deleteMealsSection,
  deleteMealFromMealsSection,
}: {
  activeDayDetails: DayType | undefined;
  isLoading: boolean;
  deleteMealsSection: (body: {}) => void;
  deleteMealFromMealsSection: (body: {}) => void;
}) => {
  const { mealsSections, isLoading: isLoadingFetchMeals } = useFetchMealsFromMealsSections(
    activeDayDetails?.mealsSections || []
  );

  return isLoadingFetchMeals ? (
    <Loading />
  ) : (
    <div>
      {mealsSections?.length ? (
        mealsSections.map((mealsSection) => (
          <Styled.MealPlan key={mealsSection.id}>
            <Styled.Header>
              <h3>{mealsSection.mealsSectionName}</h3>
              <MealsSectionOptionsDropdown
                deleteHandler={() =>
                  deleteMealsSection({
                    dayId: activeDayDetails?.id,
                    mealsSectionId: mealsSection.id,
                  })
                }
              />
            </Styled.Header>
            {isLoading ? (
              <Loading height={155} />
            ) : (
              <Styled.MealsGrid>
                {mealsSection.meals.map(({ id, mealDetails }) => (
                  <li key={id}>
                    <>
                      <Link href={`/loading/meal?id=${mealDetails.idMeal}`}>
                        <a>
                          <ImageLoading>
                            <Image
                              src={mealDetails.strMealThumb}
                              alt={mealDetails.strMeal}
                              width={150}
                              height={150}
                            />
                          </ImageLoading>
                        </a>
                      </Link>

                      <span>{mealDetails.strMeal}</span>
                      <UnderlinedButton
                        label='Delete'
                        onClick={() => deleteMealFromMealsSection({ mealId: id })}
                      />
                    </>
                  </li>
                ))}
              </Styled.MealsGrid>
            )}
          </Styled.MealPlan>
        ))
      ) : (
        <p>Add your first meal section!</p>
      )}
    </div>
  );
};

export default MealPlan;
