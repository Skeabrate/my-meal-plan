import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Styled from './MealsSection.styles';
import { MealPlansContext } from '../../../context/MealPlansContext';
import { FetchedMealType } from 'api/mealdb/useFetchMealPlanMeals';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';

const MealsSection = ({
  mealsSection,
  activeDay,
}: {
  mealsSection: FetchedMealType;
  activeDay: string;
}) => {
  const [isOptionsDropdownOpen, setIsOptionsDropdownOpen] = useState(false);

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

  return (
    <Styled.MealPlan>
      <Styled.Header>
        <h3>{mealsSection.mealPlan}</h3>
        <Styled.OptionsButton onClick={() => setIsOptionsDropdownOpen((isOpen) => !isOpen)}>
          <span></span>
          <span></span>
          <span></span>

          {isOptionsDropdownOpen && (
            <ul>
              <li>Search for a meal</li>
              <li>Add from favorites</li>
              <li>Delete meal section</li>
            </ul>
          )}
        </Styled.OptionsButton>
      </Styled.Header>

      <ul>
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
      </ul>
    </Styled.MealPlan>
  );
};

export default MealsSection;
