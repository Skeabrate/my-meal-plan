import Image from 'next/image';
import Link from 'next/link';
import * as Styled from './MealsSection.styles';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';
import MealsSectionOptionsDropdown from 'components/Dropdowns/MealsSectionOptionsDropdown';
import { MealType } from 'types/MealType';
import { useMutation } from 'hooks/useMutation';
import Loading from 'components/Loading/Loading';

type MealsSectionWithFetchedMealsType = {
  id: string;
  mealsSectionName: string;
  meals: {
    id: string;
    mealDetails: MealType;
  }[];
};

const MealsSection = ({
  mealsSection,
  activeDayId,
  deleteMealsSection,
  refetch,
}: {
  mealsSection: MealsSectionWithFetchedMealsType;
  activeDayId: string;
  deleteMealsSection: (body: {}) => void;
  refetch: () => void;
}) => {
  const { mutation: deleteMealFromMealsSection, isLoading } = useMutation(
    '/api/deleteMealFromMealsSection',
    () => {
      refetch();
    }
  );

  return (
    <Styled.MealPlan>
      <Styled.Header>
        <h3>{mealsSection.mealsSectionName}</h3>
        <MealsSectionOptionsDropdown
          deleteHandler={() =>
            deleteMealsSection({ dayId: activeDayId, mealsSectionId: mealsSection.id })
          }
        />
      </Styled.Header>
      <Styled.MealsGrid>
        {mealsSection.meals.map(({ id, mealDetails }) => (
          <li key={id}>
            {isLoading ? (
              <Loading height={150} />
            ) : (
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
            )}
          </li>
        ))}
      </Styled.MealsGrid>
    </Styled.MealPlan>
  );
};

export default MealsSection;
