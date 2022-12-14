import Link from 'next/link';
import Image from 'next/image';
import { useFetchMealById } from 'api/mealdb/useFetchMealById';
import { ROUTES } from 'utils/routes';
import ErrorBoundary from 'templates/ErrorBoundary';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import UnderlinedButton from 'components/UnderlinedButton/UnderlinedButton';

const Meal = ({ mealId, deleteHandler }: { mealId: string; deleteHandler: () => void }) => {
  const { mealById, isLoading, isError, error } = useFetchMealById(mealId);

  return (
    <ErrorBoundary
      isLoading={isLoading}
      loadingHeight={155}
      isError={isError}
      error={error}
    >
      {mealById?.length && (
        <>
          <Link href={`${ROUTES.meal}${mealById[0].idMeal}`}>
            <a>
              <ImageLoading>
                <Image
                  src={mealById[0].strMealThumb}
                  alt={mealById[0].strMeal}
                  width={300}
                  height={300}
                />
              </ImageLoading>
            </a>
          </Link>

          <span>{mealById[0].strMeal}</span>

          <UnderlinedButton
            label='Delete'
            onClick={deleteHandler}
          />
        </>
      )}
    </ErrorBoundary>
  );
};

export default Meal;
