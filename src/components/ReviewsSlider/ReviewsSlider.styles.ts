import styles, { css, Keyframes, keyframes } from 'styled-components';

const styled = { ...styles, keyframes };

const animationHelper = (animation: Keyframes) => css`
  animation: ${animation} linear 0.3s forwards, ${animation} 0.3s linear reverse 0.5s forwards;
`;

const fadeReview = styled.keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideHeader = styled.keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(40%);
    opacity: 0;
  }
`;

export const ReviewsSlider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 600px;
  margin: 3rem auto 6rem auto;

  ${({ theme }) => theme.mq.tablet} {
    margin: 6rem auto 10rem auto;
  }
`;

export const Header = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-family: ${({ theme }) => theme.fontFamily.lato};
  font-style: normal;
  font-weight: 400;
  font-size: 2.2rem;
  margin: 0;

  &::after {
    display: none;
  }

  @media (min-width: 500px) {
    flex-direction: row;
    gap: 1.2rem;
    justify-content: center;
    align-items: center;
  }

  ${({ theme }) => theme.mq.tablet} {
    font-size: ${({ theme }) => theme.fontSize.headingMobile};
    gap: 2rem;
  }
`;

export const HeaderAnimation = styled.span<{ $isSliding: boolean }>`
  position: relative;
  display: inline-block;
  width: 85px;
  font-weight: 600;
  font-style: italic;
  overflow: hidden;
  border-bottom: 2px solid ${({ theme }) => theme.themeColors.font};
  padding-bottom: 2px;

  span {
    display: inline-block;
    ${({ $isSliding }) => $isSliding && animationHelper(slideHeader)}
  }

  ${({ theme }) => theme.mq.tablet} {
    width: 120px;
  }
`;

export const Review = styled.div<{ $isSliding: boolean }>`
  line-height: 1.4;
  margin: 2rem auto 3rem;
  ${({ $isSliding }) => $isSliding && animationHelper(fadeReview)};

  span {
    display: block;
    color: ${({ theme }) => theme.themeColors.secondFont};
    font-size: ${({ theme }) => theme.fontSize.caption};
    font-style: italic;
    margin: 0.6rem 0 1.2rem;
    letter-spacing: 0.6px;
  }

  ${({ theme }) => theme.mq.tablet} {
    margin: 3rem auto 4rem;
  }
`;

export const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;

  svg {
    height: 20px;
    width: 20px;

    path {
      fill: hsl(53, 100%, 44%);
    }
  }
`;

export const Legend = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export const LegendButton = styled.button<{ $isActive: boolean }>`
  width: 16px;
  height: 16px;
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.green : 'transparent')};
  border-radius: 100px;
  border: 1.5px solid ${({ theme }) => theme.colors.green};
  transition: scale 0.2s ease-in-out;

  &:hover {
    scale: 1.2;
  }
`;
