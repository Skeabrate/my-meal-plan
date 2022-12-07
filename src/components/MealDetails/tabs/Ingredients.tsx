import { IngredientType } from 'pages/meal/[meal]';
import styled from 'styled-components';

const StyledIngredients = styled.article`
  div,
  p {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.themeColors.border};
  }

  div {
    padding-bottom: 20px;
  }

  p {
    padding: 20px 0;
    &:last-child {
      border: none;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    div {
      padding: 0 20px 20px 20px;
    }

    p {
      padding: 20px;
    }
  }
`;

const Ingredients = ({ ingredients }: { ingredients: IngredientType[] }) => {
  return (
    <StyledIngredients>
      <div>
        <h3>Ingredient:</h3>
        <h3>Measure:</h3>
      </div>

      {ingredients.map(({ id, ingredient, measure }) => (
        <p key={id}>
          <strong>{ingredient}</strong> {measure}
        </p>
      ))}
    </StyledIngredients>
  );
};

export default Ingredients;
