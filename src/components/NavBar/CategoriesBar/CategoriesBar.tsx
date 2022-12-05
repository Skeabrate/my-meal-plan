import Link from 'next/link';
import * as Styled from './CategoriesBar.styles';
import { useFetchCategories } from 'api/mealdb/useFetchCategories';
import { ROUTES } from 'utils/routes';
import SlideBar from 'components/SlideBar/SlideBar';

const CategoriesBar = () => {
  const { categories, isError } = useFetchCategories();

  let animationDelay = 0.4;

  return isError ? null : (
    <Styled.Wrapper>
      <SlideBar>
        {categories?.map(({ idCategory, strCategory }) => {
          animationDelay = +(animationDelay + 0.05).toFixed(2);
          return (
            <li key={idCategory}>
              <Link href={`${ROUTES.category}/${strCategory}`}>
                <a style={{ animationDelay: `${animationDelay}s` }}>{strCategory}</a>
              </Link>
            </li>
          );
        })}
      </SlideBar>
    </Styled.Wrapper>
  );
};

export default CategoriesBar;
