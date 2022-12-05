import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './ReviewsSlider.styles';
import StarSvg from 'assets/SVG/Star.svg';

const SLIDES = [
  {
    id: 0,
    header: 'money',
    review: `Food is amazing, fresh and good quality. The biggest advantage for me is the fact that we don't waste anything now, at the end of the week I don't have to throw away anything Also, the choice of meals is bigger than anywhere else.`,
    author: 'Wojtek',
  },
  {
    id: 1,
    header: 'time',
    review: `My husband does all the chopping and I cook which is great, Wide choice of meals so lovely not to have to decide what to have every day!`,
    author: 'Miłosz',
  },
  {
    id: 2,
    header: 'stress',
    review: `I'm enjoying receiving meals from HelloFresh, as the variety of recipes has rekindled my interest in cooking, choosing and cooking the recipes with my son has awakened an appreciation of cooking tasty meals without the hassle of shopping for the ingredients.`,
    author: 'Sebastian',
  },
];

const ReviewsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(SLIDES[0]);

  useEffect(() => {
    let interval = setInterval(() => {
      setCurrentSlide((current) => {
        const findCurrentIndex = SLIDES.findIndex((item) => item.id === current.id);
        const newIndex = findCurrentIndex + 1 > SLIDES.length - 1 ? 0 : findCurrentIndex + 1;
        return SLIDES[newIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <Styled.ReviewsSlider>
      <Styled.Header>
        We save you serious
        <Styled.HeaderAnimation>
          <span>{currentSlide.header}</span>
        </Styled.HeaderAnimation>
      </Styled.Header>

      <Styled.Review>
        <p>{currentSlide.review}</p>

        <span>~ {currentSlide.author}</span>

        <Styled.Stars>
          <StarSvg />
          <StarSvg />
          <StarSvg />
          <StarSvg />
          <StarSvg />
        </Styled.Stars>
      </Styled.Review>

      <Styled.Legend>
        {SLIDES.map((slide) => (
          <Styled.LegendButton
            key={slide.id}
            $isActive={slide.id === currentSlide.id}
            onClick={() => setCurrentSlide(slide)}
          ></Styled.LegendButton>
        ))}
      </Styled.Legend>
    </Styled.ReviewsSlider>
  );
};

export default ReviewsSlider;
