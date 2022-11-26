import Link from 'next/link';
import Image from 'next/image';
import { useFetchMealById } from 'api/mealdb/useFetchMealById';
import ImageLoading from 'components/ImageLoading/ImageLoading';
import Loading from 'components/Loading/Loading';

const Meal = ({ mealId }: { mealId: string }) => {
  const { mealById, isLoading, isError, error } = useFetchMealById(mealId);

  return (
    <>
      {isLoading || !mealById?.length ? (
        <Loading height={155} />
      ) : isError ? (
        <p>An error has occured.</p>
      ) : (
        <div>
          <Link href={`/loading/meal?id=${mealById[0].idMeal}`}>
            <a>
              <ImageLoading>
                <Image
                  src={mealById[0].strMealThumb}
                  alt={mealById[0].strMeal}
                  width={150}
                  height={150}
                />
              </ImageLoading>
            </a>
          </Link>

          <span>{mealById[0].strMeal}</span>
        </div>
      )}
    </>
  );
};

export default Meal;
