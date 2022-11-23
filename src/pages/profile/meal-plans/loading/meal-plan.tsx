import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as Styled from 'styles/profile/meal-plans/loading-meal-plans.styles';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import { Tab } from 'layouts/ProbileTabLayout/ProfileTabLayout.styles';

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/profile/meal-plans/${router.query.mealPlanName}`);
  });

  return (
    <Tab>
      <Styled.Header>
        <h1></h1>
      </Styled.Header>

      <Styled.Content>
        <h2></h2>
        <button></button>

        <Styled.Days>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </Styled.Days>

        <button></button>

        <Styled.Meals>
          <Styled.MealHeader>
            <h3></h3>
            <button></button>
          </Styled.MealHeader>

          <Styled.Meal>
            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>
          </Styled.Meal>
        </Styled.Meals>

        <Styled.Meals>
          <Styled.MealHeader>
            <h3></h3>
            <button></button>
          </Styled.MealHeader>

          <Styled.Meal>
            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>
          </Styled.Meal>
        </Styled.Meals>

        <Styled.Meals>
          <Styled.MealHeader>
            <h3></h3>
            <button></button>
          </Styled.MealHeader>

          <Styled.Meal>
            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>
          </Styled.Meal>
        </Styled.Meals>

        <Styled.Meals>
          <Styled.MealHeader>
            <h3></h3>
            <button></button>
          </Styled.MealHeader>

          <Styled.Meal>
            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>

            <div>
              <p></p>
              <p></p>
              <button></button>
            </div>
          </Styled.Meal>
        </Styled.Meals>
      </Styled.Content>
    </Tab>
  );
};

export default Loading as NextPage;

Loading.Layout = ProfileLayout;
