import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './AddingMealsGrid.styles';
import { AddingMealModalContext } from 'context/AddingMealModalContext';
import { MealType } from 'types/MealType';
import PlusSvg from 'assets/SVG/Plus.svg';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';

const AddingMealsGrid = ({
  meals,
  createMealInMealsSectionHandler,
}: {
  meals: MealType[];
  createMealInMealsSectionHandler: (body: {}) => void;
}) => {
  const { mealsSectionId } = useContext(AddingMealModalContext);

  return (
    <Styled.MealsGrid>
      {meals.map(({ idMeal, strMeal, strMealThumb }) => (
        <li key={idMeal}>
          <ImageLoading>
            <Image
              src={strMealThumb}
              alt={strMeal}
              width={300}
              height={300}
            />
          </ImageLoading>

          <Styled.OverlayOptions>
            <h3>{strMeal}</h3>

            <div>
              <UnderlinedButton
                label={
                  <>
                    <PlusSvg /> Add meal
                  </>
                }
                isGreen
                onClick={() => createMealInMealsSectionHandler({ mealsSectionId, mealId: idMeal })}
              />
              <Link href={`/loading/meal?id=${idMeal}`}>Go to meal page</Link>
            </div>
          </Styled.OverlayOptions>
        </li>
      ))}
    </Styled.MealsGrid>
  );
};

export default AddingMealsGrid;
