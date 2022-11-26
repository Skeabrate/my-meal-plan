import Prisma from '@prisma/client';
import * as Styled from './MealsSection.styles';
import MealsSectionOptionsDropdown from 'components/Dropdowns/MealsSectionOptionsDropdown';
import Meals from './Meals/Meals';

const MealsSection = ({
  mealsSection,
  deleteMealsSection,
}: {
  mealsSection: Prisma.MealsSection;
  deleteMealsSection: (body: {}) => void;
}) => {
  return (
    <Styled.MealsSection>
      <Styled.Header>
        <h3>{mealsSection.mealsSectionName}</h3>
        <MealsSectionOptionsDropdown
          deleteHandler={() =>
            deleteMealsSection({
              dayId: mealsSection.dayId,
              mealsSectionId: mealsSection.id,
            })
          }
        />
      </Styled.Header>

      <Meals mealsSectionId={mealsSection.id} />
    </Styled.MealsSection>
  );
};

export default MealsSection;
