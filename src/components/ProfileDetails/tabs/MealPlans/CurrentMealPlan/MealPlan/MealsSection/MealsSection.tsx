import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Styled from './MealsSection.styles';
import { MealPlansContext } from '../../../context/MealPlansContext';
import { FetchedMealType } from 'api/mealdb/useFetchMealPlanMeals';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import OptionsDropdown from 'components/Dropdowns/OptionsDropdown/OptionsDropdown';

const MealsSection = ({
  mealsSection,
  activeDay,
}: {
  mealsSection: FetchedMealType;
  activeDay: string;
}) => {
  const { currentMealPlan, setMealPlans } = useContext(MealPlansContext);

  const deleteMeal = (mealPlanId: number, mealId: string) => {
    setMealPlans((plans) => {
      return plans.map((plan) => {
        if (plan.id === currentMealPlan?.id) {
          const mealPlanToChange = plan.days[activeDay as keyof typeof plan.days].find(
            (p) => p.id === mealPlanId
          );
          mealPlanToChange!.meals = mealPlanToChange!.meals.filter((id) => id !== mealId);
        }
        return plan;
      });
    });
  };

  const deleteMealsSection = () => {
    setMealPlans((plans) => {
      return plans.map((plan) => {
        if (plan.id === currentMealPlan?.id) {
          plan.days[activeDay as keyof typeof plan.days] = plan.days[
            activeDay as keyof typeof plan.days
          ].filter((p) => p.mealPlan !== mealsSection.mealPlan);
        }

        return plan;
      });
    });
  };

  return (
    <Styled.MealPlan>
      <Styled.Header>
        <h3>{mealsSection.mealPlan}</h3>
        <OptionsDropdown deleteHandler={deleteMealsSection} />
      </Styled.Header>

      <Styled.MealsGrid>
        {mealsSection.meals.map(({ idMeal, strMeal, strMealThumb }) => (
          <li key={idMeal}>
            <Link href={`/meal/${idMeal}`}>
              <a>
                <ImageLoading>
                  <Image
                    src={strMealThumb}
                    alt={strMeal}
                    width={150}
                    height={150}
                  />
                </ImageLoading>
              </a>
            </Link>

            <span>{strMeal}</span>
            <UnderlinedButton
              label='Delete'
              onClick={() => deleteMeal(mealsSection.id, idMeal)}
            />
          </li>
        ))}
      </Styled.MealsGrid>
    </Styled.MealPlan>
  );
};

export default MealsSection;
