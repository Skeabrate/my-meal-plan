import Image from 'next/image';
import Link from 'next/link';
import * as Styled from './MealsSection.styles';
import { FetchedMealType } from 'api/mealdb/useFetchMealPlanMeals';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealsSectionOptionsDropdown from 'components/Dropdowns/MealsSectionOptionsDropdown';

const MealsSection = ({
  mealsSection,
  activeDay,
}: {
  mealsSection: FetchedMealType;
  activeDay: string;
}) => {
  return (
    <Styled.MealPlan>
      <Styled.Header>
        <h3>{mealsSection.mealPlan}</h3>
        <MealsSectionOptionsDropdown deleteHandler={() => {}} />
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
              onClick={() => {}}
            />
          </li>
        ))}
      </Styled.MealsGrid>
    </Styled.MealPlan>
  );
};

export default MealsSection;
