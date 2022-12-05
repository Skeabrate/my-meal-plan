import styles, { keyframes } from 'styled-components';

const styled = { keyframes, ...styles };

const moveSpanStart = styled.keyframes`
  to {
    transform: translateY(-105%);
  }
`;

const moveSpanEnd = keyframes`
  from{
    transform: translateY(100%);
  }
  to{
    transform: translateY(0%);
  }
`;

export const HeroImage = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.themeColors.border};
  display: flex;

  img {
    min-height: 200px;
  }
`;

export const HeroInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  text-align: center;
  width: 90%;

  h1 {
    margin: 0;

    &::after {
      display: none;
    }
  }

  p {
    font-weight: 600;
  }

  a {
    position: relative;
    width: 150px;
    height: 40px;
    padding: 1rem 2rem;
    overflow: hidden;
    background: transparent;
    border: none;
    color: white;
    font-weight: 600;
    text-decoration: none;

    span {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:hover span {
      animation: ${moveSpanStart} 0.2s forwards, ${moveSpanEnd} 0.2s forwards 0.2s;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.colors.green};
      clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
      transition: clip-path 0.2s ease-in-out;
    }

    &:hover::after {
      clip-path: polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%);
      transition-duration: 0.4s;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    gap: 1.8rem;
  }
`;
