import { useContext, useState } from 'react';
import * as Styled from './MealPlan.styles';
import Image from 'next/image';
import { useFetchMealPlanMeals } from 'api/mealdb/useFetchMealPlanMeals';
import { MealPlansContext } from '../../context/MealPlansContext';
import OpenInput from 'components/OpenInput/OpenInput';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import Loading from 'components/Loading/Loading';
import Link from 'next/link';

const MealPlan = ({ activeDay }: { activeDay: string }) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const { currentMealPlan, setMealPlans } = useContext(MealPlansContext);

  const mealPlansInCurrentDay =
    currentMealPlan?.days[activeDay as keyof typeof currentMealPlan.days] || [];
  const { fetchedMealPlans, isLoading, error } = useFetchMealPlanMeals(mealPlansInCurrentDay);

  const addNewMealSection = (inputValue: string) => {
    setMealPlans((plans) => {
      return plans.map((plan) => {
        if (plan.id === currentMealPlan?.id) {
          plan.days[activeDay as keyof typeof plan.days].push({
            id: 123,
            mealPlan: inputValue,
            meals: [],
          });
        }
        return plan;
      });
    });

    setIsInputOpen(false);
  };

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
    <div>
      <div>
        <Styled.AddMealsSectionButton onClick={() => setIsInputOpen((isOpen) => !isOpen)}>
          Add new meals section
        </Styled.AddMealsSectionButton>

        {isInputOpen && (
          <OpenInput
            label='Add new meal section'
            updateMealPLans={addNewMealSection}
            placeholder='Meals section name...'
          />
        )}
      </div>

      {isLoading ? (
        <Loading />
      ) : error?.message ? (
        <p>Error occured.</p>
      ) : fetchedMealPlans.length ? (
        fetchedMealPlans.map(({ id, mealPlan, meals }) => (
          <Styled.MealPlan key={id}>
            <h3>{mealPlan}</h3>
            <ul>
              {meals.map(({ idMeal, strMeal, strMealThumb }) => (
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

                  <p>
                    {strMeal}
                    <button onClick={() => deleteMeal(id, idMeal)}>Delete</button>
                  </p>
                </li>
              ))}
            </ul>
          </Styled.MealPlan>
        ))
      ) : (
        <p>Add your first meal section!</p>
      )}
    </div>
  );
};

export default MealPlan;
