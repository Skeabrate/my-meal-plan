import Link from 'next/link';
import { useFetchCategories } from 'hooks/useFetchCategories';

const CategoriesBar = () => {
  const { data, isLoading, error } = useFetchCategories();

  return (
    <div>
      <ul>
        {data?.map(({ idCategory, strCategory }) => (
          <li key={idCategory}>
            <Link href={`/categories/${strCategory}`}>{strCategory}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesBar;
