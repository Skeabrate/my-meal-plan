import Link from 'next/link';
import styled from 'styled-components';
import { useFetchCategories } from 'hooks/useFetchCategories';

const Wrapper = styled.div`
  ul {
    list-style: none;
    display: flex;

    a {
      word-break: break-all;
    }
  }
`;

const CategoriesBar = () => {
  const { data, isLoading, error } = useFetchCategories();

  return (
    <Wrapper>
      <ul>
        {data?.map(({ idCategory, strCategory }) => (
          <li key={idCategory}>
            <Link href={`/categories/${strCategory}`}>{strCategory}</Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default CategoriesBar;
