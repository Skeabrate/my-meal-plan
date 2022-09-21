import { useRef, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import * as Styled from './CategoriesBar.styles';
import RightArrow from 'assets/SVG/RightArrow.svg';
import LeftArrow from 'assets/SVG/LeftArrow.svg';
import { useFetchCategories } from 'hooks/useFetchCategories';
import { ResizeWindowContext } from 'context/ResizeWindowContext';

const CategoriesBar = () => {
  const [slider, setSlider] = useState({
    isSliderMoving: false,
    isLinkDisabled: false,
    startPosition: 0,
    endPosition: 0,
  });

  const [displayArrows, setDisplayArrows] = useState({
    right: false,
    left: false,
  });

  const { data, error } = useFetchCategories();

  const { windowWidth } = useContext(ResizeWindowContext);

  const listRef = useRef<HTMLUListElement>(null);

  const startSliding = (e: any) => {
    if (!window.matchMedia('(pointer: coarse)').matches) e.preventDefault(); // preventDefault if the screen doesn't support touch

    setSlider((state) => ({
      ...state,
      isSliderMoving: true,
      startPosition: e.pageX ?? e.touches[0].clientX,
    }));

    const getTransformMatrix = listRef.current
      ? window.getComputedStyle(listRef.current).getPropertyValue('transform')
      : '';

    if (getTransformMatrix !== 'none')
      setSlider((state) => ({
        ...state,
        endPosition: parseInt(getTransformMatrix.split(',')[4].trim()),
      }));
  };

  const cancelSliding = () =>
    setSlider((state) => ({
      ...state,
      isSliderMoving: false,
      isLinkDisabled: false,
    }));

  const updateSliderPostion = (e: any) => {
    if (!slider.isSliderMoving || !listRef.current) return;
    if (listRef.current.getBoundingClientRect().width < windowWidth) return;

    setSlider((state) => ({
      ...state,
      isLinkDisabled: true,
    }));

    const currentPosition = e.pageX ?? e.touches[0].clientX;
    let diff = currentPosition - slider.startPosition;
    listRef.current.style.transform = `translateX(${slider.endPosition + diff}px)`;

    if (listRef.current.getBoundingClientRect().left > 0) {
      listRef.current.style.transform = 'translateX(0)';
      setDisplayArrows((state) => ({
        ...state,
        left: false,
      }));
    } else {
      setDisplayArrows((state) => ({
        ...state,
        left: true,
      }));
    }

    if (listRef.current.getBoundingClientRect().right <= windowWidth) {
      listRef.current.style.transform = `translateX(-${
        listRef.current.getBoundingClientRect().width - windowWidth
      }px)`;
      setDisplayArrows((state) => ({
        ...state,
        right: false,
      }));
    } else {
      setDisplayArrows((state) => ({
        ...state,
        right: true,
      }));
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.transform = 'translateX(0)';

      if (listRef.current.getBoundingClientRect().width > windowWidth)
        setDisplayArrows({
          right: true,
          left: false,
        });
      else
        setDisplayArrows({
          right: false,
          left: false,
        });
    }
  }, [windowWidth, listRef]);

  return (
    <>
      {!error && (
        <Styled.Wrapper $isLinkDisabled={slider.isLinkDisabled}>
          <Styled.Arrow
            $isActive={displayArrows.left}
            $left
          >
            <LeftArrow />
          </Styled.Arrow>

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

          <Styled.Arrow
            $isActive={displayArrows.right}
            $right
          >
            <RightArrow />
          </Styled.Arrow>
        </Styled.Wrapper>
      )}
    </>
  );
};

export default CategoriesBar;
