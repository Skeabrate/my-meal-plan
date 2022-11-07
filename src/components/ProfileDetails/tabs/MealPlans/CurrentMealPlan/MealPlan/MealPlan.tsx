import { useContext, useState } from 'react';
import * as Styled from './MealPlan.styles';
import Image from 'next/image';
import Link from 'next/link';
import { useFetchMealPlans } from 'api/mealdb/useFetchMealPlanMeals';
import { MealPlansContext } from '../../context/MealPlansContext';
import OpenInput from 'components/OpenInput/OpenInput';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import Loading from 'components/Loading/Loading';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';

const MealPlan = ({ activeDay }: { activeDay: string }) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const { currentMealPlan, setMealPlans } = useContext(MealPlansContext);

  const mealPlansInCurrentDay =
    currentMealPlan?.days[activeDay as keyof typeof currentMealPlan.days] || [];
  const { fetchedMealPlans, isLoading, error } = useFetchMealPlans(mealPlansInCurrentDay);

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
        <div style={{ padding: '15px 0 10px' }}>
          <UnderlinedButton
            label='Add new meals section'
            onClick={() => setIsInputOpen((isOpen) => !isOpen)}
            isGreen
          />
        </div>

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

                  <span>{strMeal}</span>
                  <UnderlinedButton
                    label='Delete'
                    onClick={() => deleteMeal(id, idMeal)}
                  />
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
