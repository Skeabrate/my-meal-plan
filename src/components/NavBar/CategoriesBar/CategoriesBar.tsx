import Link from 'next/link';
import * as Styled from './CategoriesBar.styles';
import { useFetchCategories } from 'api/useFetchCategories';
import SlideBar from 'components/SlideBar/SlideBar';

const CategoriesBar = () => {
  const { categories, error } = useFetchCategories();

  let animationDelay = 0.4;

  return error ? null : (
    <Styled.Wrapper>
      <SlideBar>
        {categories?.map(({ idCategory, strCategory }) => {
          animationDelay = +(animationDelay + 0.1).toFixed(2);
          return (
            <li key={idCategory}>
              <Link href={`/category/${strCategory}`}>
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
