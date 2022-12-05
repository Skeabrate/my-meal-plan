import styled from 'styled-components';

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
  font-family: ${({ theme }) => theme.fontFamily.lato};
  font-style: normal;
  font-weight: 400;
  font-size: 2.2rem;
  margin: 0;

  &::after {
    display: none;
  }

  span {
    position: relative;
    display: inline-block;
    width: 100px;
    font-weight: 600;
    font-style: italic;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      height: 2px;
      width: 90%;
      background-color: ${({ theme }) => theme.themeColors.font};
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    font-size: ${({ theme }) => theme.fontSize.headingMobile};

    span {
      width: 130px;
    }
  }
`;

export const Review = styled.div`
  line-height: 1.4;
  margin: 2rem auto 3rem;
  position: relative;

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
  gap: 12px;
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
