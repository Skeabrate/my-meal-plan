import Link from 'next/link';
import { NextPage } from 'next';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as Styled from 'styles/meal.styles';
import { dehydrate, QueryClient } from 'react-query';
import { fetchCategories } from 'api/mealdb/useFetchCategories';
import { fetchMealById, useFetchMealById } from 'api/mealdb/useFetchMealById';
import { ROUTES } from 'utils/routes';
import MealDetails from 'components/MealDetails/MealDetails';
import Instruction from 'components/MealDetails/tabs/Instruction';
import Ingredients from 'components/MealDetails/tabs/Ingredients';
import Steps from 'components/MealDetails/tabs/Steps';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import GoBackButton from 'components/GoBackButton/GoBackButton';
import MealOptionsDropdown from 'components/Dropdowns/MealOptionsDropdown/MealOptionsDropdown';

export type IngredientType = { id: number; ingredient: string; measure: string };
export type StepType = { id: number; step: string; description: string };

const Meal = ({ mealId }: { mealId: string }) => {
  const { mealById } = useFetchMealById(mealId);
  const router = useRouter();

  if (!mealById) {
    router.replace('/404');
    return null;
  }

  const { idMeal, strMeal, strCategory, strArea, strMealThumb, strYoutube, strInstructions } =
    mealById[0];

  const getIngredients = Object.entries(mealById[0]).reduce((acc, [key, value]) => {
    if (key.includes('strIngredient') && value?.trim()) {
      acc.push({ id: +key.split('strIngredient')[1], ingredient: value, measure: '' });
    }
    if (key.includes('strMeasure') && value?.trim()) {
      const index = +key.split('strMeasure')[1];
      acc[index - 1].measure = value;
    }

    return acc;
  }, [] as IngredientType[]);

  const getSteps: StepType[] = strInstructions
    .split('.')
    .filter((item) => item && item.trim())
    .map((item, index) => ({
      id: index,
      step: index < 9 ? `0${index + 1}` : `${index + 1}`,
      description: `${item.trim()}.`,
    }));

  const getYoutubeUrl = `https://www.youtube.com/embed/${strYoutube.slice(32)}`;

  return (
    <>
      <GoBackButton />

      <Styled.Header>
        <h1>{strMeal}</h1>

        <div>
          <p>
            Category:
            <span>
              <Link href={`${ROUTES.category}/${strCategory}`}>{strCategory}</Link>
            </span>
          </p>
          <p>
            Area: <span>{strArea}</span>
          </p>
        </div>
      </Styled.Header>

      <Styled.MealGrid>
        <Styled.Gallery>
          <ImageLoading>
            <Image
              src={strMealThumb}
              alt={strMeal}
              layout={'fill'}
              objectFit={'cover'}
            />
            <MealOptionsDropdown mealId={idMeal} />
          </ImageLoading>

          <iframe
            title={strMeal}
            src={getYoutubeUrl}
            width='100%'
            height='300px'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </Styled.Gallery>

        <MealDetails
          tabs={[
            {
              id: 0,
              label: 'Ingredients',
              Component: <Ingredients ingredients={getIngredients} />,
            },
            {
              id: 1,
              label: 'Cooking',
              Component: <Steps steps={getSteps} />,
            },
            {
              id: 2,
              label: 'Instruction',
              Component: <Instruction instruction={strInstructions} />,
            },
          ]}
        />
      </Styled.MealGrid>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  const mealId = context.params?.meal as string;

  await queryClient.prefetchQuery('fetchCategories', fetchCategories);
  await queryClient.prefetchQuery(['fetchMealById', mealId], () => fetchMealById(mealId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      mealId,
    },
  };
}

export default Meal as NextPage;
