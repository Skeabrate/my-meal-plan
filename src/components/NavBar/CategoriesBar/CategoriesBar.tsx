import { useRef, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import * as Styled from './CategoriesBar.styles';
import { useFetchCategories } from 'hooks/useFetchCategories';
import { ResizeWindowContext } from 'context/ResizeWindowContext';

const CategoriesBar = () => {
  const [slider, setSlider] = useState({
    isSliderMoving: false,
    isLinkDisabled: false,
    startPosition: 0,
    endPosition: 0,
  });

  const { data, isLoading, error } = useFetchCategories();

  const { windowWidth } = useContext(ResizeWindowContext);

  const listRef = useRef<HTMLUListElement>(null);

  const startSliding = (e: any) => {
    if (!window.matchMedia('(pointer: coarse)').matches) e.preventDefault(); // preventDefault if the screen doesn't support touch

    if (!listRef.current) return;

    setSlider((state) => ({
      ...state,
      isSliderMoving: true,
      startPosition: e.pageX ?? e.touches[0].clientX,
    }));

    const transformMatrix = window.getComputedStyle(listRef.current).getPropertyValue('transform');

    if (transformMatrix !== 'none') {
      const endPosition = parseInt(transformMatrix.split(',')[4].trim());

      setSlider((state) => ({
        ...state,
        endPosition,
      }));
    }
  };

  const cancelSliding = () => {
    setSlider((state) => ({
      ...state,
      isSliderMoving: false,
      isLinkDisabled: false,
    }));
  };

  const updateSliderPostion = (e: any) => {
    if (!slider.isSliderMoving || !listRef.current) return;
    if (listRef.current.getBoundingClientRect().width < windowWidth) return;

    setSlider((state) => ({
      ...state,
      isLinkDisabled: true,
    }));

    const currentPosition = e.pageX ?? e.touches[0].clientX;
    const diff = currentPosition - slider.startPosition;
    listRef.current.style.transform = `translateX(${slider.endPosition + diff}px)`;

    if (listRef.current.getBoundingClientRect().left > 0) {
      listRef.current.style.transform = 'translateX(0)';
    }

    if (listRef.current.getBoundingClientRect().right <= windowWidth) {
      listRef.current.style.transform = `translateX(-${
        listRef.current.getBoundingClientRect().width - windowWidth
      }px)`;
    }
  };

  useEffect(() => {
    if (listRef.current) listRef.current.style.transform = 'translateX(0)';
  }, [windowWidth, listRef]);

  return (
    <Styled.Wrapper $isLinkDisabled={slider.isLinkDisabled}>
      <ul
        ref={listRef}
        // Desktop
        onMouseDown={startSliding}
        onMouseUp={cancelSliding}
        onMouseLeave={cancelSliding}
        onMouseMove={updateSliderPostion}
        // Mobile
        onTouchStart={startSliding}
        onTouchEnd={cancelSliding}
        onTouchCancel={cancelSliding}
        onTouchMove={updateSliderPostion}
      >
        {data?.map(({ idCategory, strCategory }) => (
          <li key={idCategory}>
            <Link href={`/categories/${strCategory}`}>{strCategory}</Link>
          </li>
        ))}
      </ul>
    </Styled.Wrapper>
  );
};

export default CategoriesBar;
