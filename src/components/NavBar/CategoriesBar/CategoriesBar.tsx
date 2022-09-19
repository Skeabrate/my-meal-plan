import Link from 'next/link';
import { useFetchCategories } from 'hooks/useFetchCategories';
import * as Styled from './CategoriesBar.styles';
import { useRef, useState } from 'react';

const CategoriesBar = () => {
  const [slider, setSlider] = useState({
    isSliderMoving: false,
    isLinkDisabled: false,
    startPosition: 0,
    endPosition: 0,
  });

  const { data, isLoading, error } = useFetchCategories();

  const listRef = useRef<HTMLUListElement>(null);

  const onMouseDownHandler = (e: any) => {
    e.preventDefault();
    if (!listRef.current) return;

    const transformMatrix = window.getComputedStyle(listRef.current).getPropertyValue('transform');

    if (transformMatrix !== 'none') {
      const endPosition = parseInt(transformMatrix.split(',')[4].trim());

      setSlider((state) => ({
        ...state,
        endPosition,
      }));
    }

    setSlider((state) => ({
      ...state,
      isSliderMoving: true,
      startPosition: e.pageX,
    }));
  };

  const cancelSliding = (e: any) => {
    e.preventDefault();
    setSlider((state) => ({
      ...state,
      isSliderMoving: false,
      isLinkDisabled: false,
    }));
  };

  const updateSliderPostion = (e: any) => {
    e.preventDefault();
    if (!slider.isSliderMoving || !listRef.current) return;

    setSlider((state) => ({
      ...state,
      isLinkDisabled: true,
    }));

    const currentPosition = e.pageX;
    const diff = currentPosition - slider.startPosition;
    listRef.current.style.transform = `translateX(${slider.endPosition + diff}px)`;
  };

  return (
    <Styled.Wrapper $isLinkDisabled={slider.isLinkDisabled}>
      <ul
        ref={listRef}
        onMouseMove={updateSliderPostion}
        onMouseLeave={cancelSliding}
        onMouseDown={onMouseDownHandler}
      >
        {data?.map(({ idCategory, strCategory }) => (
          <li
            key={idCategory}
            onMouseUp={cancelSliding}
          >
            <Link href={`/categories/${strCategory}`}>{strCategory}</Link>
          </li>
        ))}
      </ul>
    </Styled.Wrapper>
  );
};

export default CategoriesBar;
