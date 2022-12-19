import React, { useCallback, useEffect, useState } from 'react';
import * as Styled from './ReviewsSlider.styles';
import StarSvg from 'assets/SVG/Star';

type SlideType = {
  id: number;
  header: string;
  review: string;
  author: string;
};

const SLIDES: SlideType[] = [
  {
    id: 0,
    header: 'money',
    review: `Food is amazing, fresh and good quality. The biggest advantage for me is the fact that we don't waste anything now, at the end of the week I don't have to throw away anything Also, the choice of meals is bigger than anywhere else.`,
    author: 'Wojtek',
  },
  {
    id: 1,
    header: 'time',
    review: `My wife does all the schopping and I cook which is great, Wide choice of meals so lovely not to have to decide what to have every day! I definitely reccomand my-meal-plans to everyone.`,
    author: 'Miłosz',
  },
  {
    id: 2,
    header: 'stress',
    review: `I'm enjoying receiving meals from MyMealPlan, as the variety of recipes has rekindled my interest in cooking, choosing and cooking the recipes with my son has awakened an appreciation of cooking tasty meals.`,
    author: 'Sebastian',
  },
];

export const useReviewsSlider = () => {
  const [slider, setSlider] = useState({
    isSliding: false,
    activeSlideIndex: SLIDES[0].id,
    currentSlide: SLIDES[0],
  });

  const slideChangeHandler = useCallback(
    (newSlide: SlideType) => {
      // disable sliding when slider is active
      if (newSlide.id === slider.activeSlideIndex || slider.isSliding) return;

      setSlider((slider) => ({
        ...slider,
        activeSlideIndex: newSlide.id,
        isSliding: true,
      }));

      setTimeout(() => {
        setSlider((slider) => ({
          ...slider,
          currentSlide: newSlide,
        }));
      }, 300);

      setTimeout(() => {
        setSlider((slider) => ({
          ...slider,
          isSliding: false,
        }));
      }, 800);
    },
    [slider.isSliding, slider.activeSlideIndex]
  );

  useEffect(() => {
    let interval = setInterval(() => {
      const findCurrentIndex = SLIDES.findIndex((item) => item.id === slider.activeSlideIndex);
      const newIndex = findCurrentIndex + 1 > SLIDES.length - 1 ? 0 : findCurrentIndex + 1;
      const newSlide = SLIDES[newIndex];

      slideChangeHandler(newSlide);
    }, 3000);

    return () => clearInterval(interval);
  }, [slider, slideChangeHandler]);

  return { slider, slideChangeHandler };
};

const ReviewsSlider = () => {
  const { slider, slideChangeHandler } = useReviewsSlider();

  return (
    <Styled.ReviewsSlider>
      <Styled.Header>
        We save you serious
        <Styled.HeaderAnimation $isSliding={slider.isSliding}>
          <span data-testid='reviews-slider-header'>{slider.currentSlide.header}</span>
        </Styled.HeaderAnimation>
      </Styled.Header>

      <Styled.Review $isSliding={slider.isSliding}>
        <p>{slider.currentSlide.review}</p>

        <span>~ {slider.currentSlide.author}</span>

        <Styled.Stars>
          <StarSvg />
          <StarSvg />
          <StarSvg />
          <StarSvg />
          <StarSvg />
        </Styled.Stars>
      </Styled.Review>

      <Styled.Legend>
        {SLIDES.map((slide, index) => (
          <Styled.LegendButton
            aria-label={`review ${index}`}
            key={slide.id}
            $isActive={slide.id === slider.activeSlideIndex}
            onClick={() => slideChangeHandler(slide)}
          ></Styled.LegendButton>
        ))}
      </Styled.Legend>
    </Styled.ReviewsSlider>
  );
};

export default ReviewsSlider;
