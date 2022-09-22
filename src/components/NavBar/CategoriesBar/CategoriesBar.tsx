import Link from 'next/link';
import * as Styled from './CategoriesBar.styles';
import { useFetchCategories } from 'hooks/useFetchCategories';
import SlideBar from 'components/SlideBar/SlideBar';

const CategoriesBar = () => {
  const { data, error } = useFetchCategories();

  return error ? null : (
    <Styled.Wrapper>
      <SlideBar>
        {data?.map(({ idCategory, strCategory }) => (
          <li key={idCategory}>
            <Link href={`/category/${strCategory}`}>{strCategory}</Link>
          </li>
        ))}
      </SlideBar>
    </Styled.Wrapper>
  );
};

export default CategoriesBar;
