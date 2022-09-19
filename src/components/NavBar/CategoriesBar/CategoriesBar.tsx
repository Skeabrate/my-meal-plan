import Link from 'next/link';
import styled from 'styled-components';
import { useFetchCategories } from 'hooks/useFetchCategories';

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
    border-top: 1px solid ${({ theme }) => theme.colors.blue};

    li {
      height: 40px;

      a {
        background-color: white;
        color: ${({ theme }) => theme.colors.blue};
        padding-inline: 20px;
        display: flex;
        align-items: center;
        text-decoration: none;
        font-weight: 600;
        font-size: ${({ theme }) => theme.fontSize.caption};
        letter-spacing: 1px;
        width: 100%;
        height: 100%;
      }
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
