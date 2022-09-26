import React, { useRef, useState, useContext, useEffect } from 'react';
import * as Styled from './SliderBar.styles';
import RightArrow from 'assets/SVG/RightArrow.svg';
import LeftArrow from 'assets/SVG/LeftArrow.svg';
import { ResizeWindowContext } from 'context/ResizeWindowContext';

const SlideBar = ({ children }: { children: React.ReactNode }) => {
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

  const { windowWidth } = useContext(ResizeWindowContext);
  const listRef = useRef<HTMLUListElement>(null);

  const sliderTransitionValue = 'transform .3s ease-in-out';

  const getSliderTransformX = (ref: HTMLUListElement) =>
    parseInt(window.getComputedStyle(ref).getPropertyValue('transform').split(',')[4].trim());

  const startSliding = (e: any) => {
    const doesScreenSupportTouchEvents = window.matchMedia('(pointer: coarse)').matches;
    if (!doesScreenSupportTouchEvents) e.preventDefault();

    listRef.current && (listRef.current.style.transition = 'none');

    setSlider((state) => ({
      ...state,
      isSliderMoving: true,
      startPosition: e.pageX ?? e.touches[0].clientX,
      endPosition: listRef.current ? getSliderTransformX(listRef.current) : 0,
    }));
  };

  const cancelSliding = () =>
    slider.isSliderMoving &&
    setSlider((state) => ({
      ...state,
      isSliderMoving: false,
      isLinkDisabled: false,
    }));

  const updateSliderPostion = (e: any) => {
    if (!slider.isSliderMoving || !listRef.current) return;

    const isSliderSmallerThanWindowWidth =
      listRef.current.getBoundingClientRect().width < windowWidth;
    if (isSliderSmallerThanWindowWidth) return;

    const currentPosition = e.pageX ?? e.touches[0].clientX;
    let diff = currentPosition - slider.startPosition;
    listRef.current.style.transform = `translateX(${slider.endPosition + diff}px)`;

    const isLinkDisabledOnSlide = diff > 10 || diff < -10;
    if (isLinkDisabledOnSlide) {
      setSlider((state) => ({
        ...state,
        isLinkDisabled: true,
      }));
    }

    const isSliderOnTheBeginnig = listRef.current.getBoundingClientRect().left > 0;
    if (isSliderOnTheBeginnig) {
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

    const isSliderOnTheEnd = listRef.current.getBoundingClientRect().right <= windowWidth;
    if (isSliderOnTheEnd) {
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

  const arrowButtonHandler = (direction: string) => {
    if (!listRef.current) return;

    const sliderOffset = getSliderTransformX(listRef.current);
    const theEndOfSlider = Math.floor(listRef.current.getBoundingClientRect().right);
    let moveSliderOnClickValue = direction === 'right' ? -200 : direction === 'left' ? 200 : 0;

    // handle arrows display and slider move value
    const isMoveSliderLeftValueBiggerThanSpaceLeft = sliderOffset + moveSliderOnClickValue >= 0;
    const isMoveSliderRightValueBiggerThanSpaceLeft =
      theEndOfSlider - windowWidth <= moveSliderOnClickValue * -1;

    if (direction === 'left' && isMoveSliderLeftValueBiggerThanSpaceLeft) {
      moveSliderOnClickValue = -1 * sliderOffset;
      setDisplayArrows({
        right: true,
        left: false,
      });
    } else if (direction === 'right' && isMoveSliderRightValueBiggerThanSpaceLeft) {
      moveSliderOnClickValue = -1 * (theEndOfSlider - windowWidth);
      setDisplayArrows({
        left: true,
        right: false,
      });
    } else {
      setDisplayArrows({
        left: true,
        right: true,
      });
    }

    listRef.current.style.transition = sliderTransitionValue;
    listRef.current.style.transform = `translateX(${sliderOffset + moveSliderOnClickValue}px)`;
  };

  // handle window resize
  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.transition = sliderTransitionValue;
      listRef.current.style.transform = 'translateX(0)';

      const isSliderBiggerThanWindowWidth =
        listRef.current.getBoundingClientRect().width > windowWidth;
      if (isSliderBiggerThanWindowWidth) {
        setDisplayArrows({
          right: true,
          left: false,
        });
      } else {
        setDisplayArrows({
          right: false,
          left: false,
        });
      }
    }
  }, [windowWidth, listRef]);

  return (
    <Styled.SlideBar $isLinkDisabled={slider.isLinkDisabled}>
      <Styled.Arrow
        $isActive={displayArrows.left}
        $left
        onClick={() => arrowButtonHandler('left')}
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
        {children}
      </ul>

      <Styled.Arrow
        $isActive={displayArrows.right}
        $right
        onClick={() => arrowButtonHandler('right')}
      >
        <RightArrow />
      </Styled.Arrow>
    </Styled.SlideBar>
  );
};

export default SlideBar;