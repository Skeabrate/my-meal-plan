import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from 'utils/renderWithProviders';
import ReviewsSlider, { useReviewsSlider } from 'components/ReviewsSlider/ReviewsSlider';

jest.useRealTimers();
jest.spyOn(global, 'setInterval');

const handleTransition = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

describe('Reviews slider', () => {
  it('slider should change every 3 seconds', () => {
    renderWithProviders(<ReviewsSlider />);

    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 3000);
  });

  it('slider should change between states in time', async () => {
    const { result } = renderHook(() => useReviewsSlider());

    const newSlide = {
      id: 1,
      header: 'header',
      review: 'review',
      author: 'author',
    };

    act(() => {
      result.current.slideChangeHandler(newSlide);
    });

    expect(result.current.slider.activeSlideIndex).toEqual(newSlide.id);
    expect(result.current.slider.isSliding).toBe(true);

    // slider transition timeout + 100ms
    await handleTransition(400).then(() => {
      expect(result.current.slider.activeSlideIndex).toEqual(newSlide.id);
      expect(result.current.slider.currentSlide).toEqual(newSlide);
    });

    await handleTransition(500).then(() => {
      expect(result.current.slider.isSliding).toBe(false);
    });
  });

  it('user should not be able to change slide during transition duration', async () => {
    const { result } = renderHook(() => useReviewsSlider());

    const firstSlide = {
      id: 1,
      header: 'header',
      review: 'review',
      author: 'author',
    };

    const secondSlide = {
      id: 2,
      header: 'header',
      review: 'review',
      author: 'author',
    };

    act(() => {
      result.current.slideChangeHandler(firstSlide);
    });

    act(() => {
      result.current.slideChangeHandler(secondSlide);
    });

    await handleTransition(400).then(() => {
      expect(result.current.slider.activeSlideIndex).toEqual(firstSlide.id);
      expect(result.current.slider.currentSlide).toEqual(firstSlide);
    });
  });
});
