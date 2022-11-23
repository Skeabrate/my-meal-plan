import Image from 'next/image';
import Link from 'next/link';
import * as Styled from './MealsSection.styles';
import { useDeleteMealsSection } from 'api/pscale/MealPlan/MealsSection/useDeleteMealsSection';
import { useDeleteMealFromMealsSection } from 'api/pscale/MealPlan/MealsSection/Meals/useDeleteMealFromMealsSection';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealsSectionOptionsDropdown from 'components/Dropdowns/MealsSectionOptionsDropdown';

const MealsSection = ({ mealsSection, activeDayId }) => {
  const { deleteMealsSection } = useDeleteMealsSection();
  const { deleteMealFromMealsSection } = useDeleteMealFromMealsSection();

  return (
    <Styled.MealPlan>
      <Styled.Header>
        <h3>{mealsSection.mealsSectionName}</h3>
        <MealsSectionOptionsDropdown
          deleteHandler={() => deleteMealsSection(activeDayId, mealsSection.id)}
        />
      </Styled.Header>
      <Styled.MealsGrid>
        {mealsSection.meals.map(({ id, mealDetails }) => (
          <li key={id}>
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
              onClick={() => deleteMealFromMealsSection(id)}
            />
          </li>
        ))}
      </Styled.MealsGrid>
    </Styled.MealPlan>
  );
};

export default MealsSection;
