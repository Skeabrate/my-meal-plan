import styles, { css, keyframes, Keyframes } from 'styled-components';

const styled = { keyframes, ...styles };

const scaleAnimation = styled.keyframes`
  from {
    opacity: 0;
    transform: translateY(calc(-50% - 10px)) scale(0);
  }
  to {
    opacity: 1;
    transform: translateY(calc(-50% - 10px)) scale(1);
  }
`;

type MenuProps = {
  $isCartOpen: null | boolean;
};

const navBarMobileHeight = '80px';

export const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${navBarMobileHeight};
  padding-inline: 10px;
  position: relative;
  font-family: ${({ theme }) => theme.fontFamily.abril};

  a {
    display: flex;
  }

  ${({ theme }) => theme.mq.tablet} {
    height: 100px;
    padding-inline: 40px;

    a img {
      height: unset !important;
    }
  }
`;

export const Logo = styled.a`
  display: flex;
  position: relative;
  z-index: 9999;
  ${({ theme }) => theme.boxShadow('white')};

  img {
    height: 60px !important;
  }

  ${({ theme }) => theme.mq.tablet} {
    img {
      height: unset !important;
    }
  }
`;

const buttonStyle = css`
  height: 4px;
  width: 36px;
  transition-duration: 0.5s;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.themeColors.secondFont};
`;

export const HambuergerMenu = styled.button<MenuProps>`
  width: 60px;
  height: 60px;
  transition-duration: 0.5s;
  position: relative;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  div {
    ${buttonStyle}

    position: relative;
    ${({ $isCartOpen }) => $isCartOpen && `transform: rotateZ(-180deg);`};

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: -12px;
      ${buttonStyle}
      ${({ $isCartOpen }) =>
        $isCartOpen && `transform: rotateZ(-45deg) scaleX(0.75) translate(-12px, -4px);`};
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -12px;
      ${buttonStyle}
      ${({ $isCartOpen }) =>
        $isCartOpen && `transform: rotateZ(45deg) scaleX(0.75) translate(-12px, 4px);`};
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    display: none;
  }
`;

const animateSlideCartIn = styled.keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const animateSlideCartOut = styled.keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const animationSlideCartHelper = (animation: Keyframes, delay: string = '0s') => css`
  animation: ${animation} 0.6s forwards;
  animation-delay: ${delay};
`;

export const SlideCart = styled.div<MenuProps & { $windowHeight: number }>`
  position: fixed;
  top: ${navBarMobileHeight};
  left: 0;
  width: 100%;
  height: ${({ $windowHeight }) => `calc(${$windowHeight}px - ${navBarMobileHeight})`};
  min-height: 300px;
  background-color: ${({ theme }) => theme.themeColors.background};
  display: flex;
  flex-direction: column;
  z-index: 999;

  transform: ${({ $isCartOpen }) =>
    $isCartOpen === false ? 'translateX(0)' : 'translateX(-100%)'};
  ${({ $isCartOpen }) => {
    if ($isCartOpen === true) return animationSlideCartHelper(animateSlideCartIn);
    else if ($isCartOpen === false) return animationSlideCartHelper(animateSlideCartOut, '0.5s');
  }};

  ul {
    list-style: none;
  }

  ${({ theme }) => theme.mq.tablet} {
    position: initial;
    width: 100%;
    height: 100%;
    min-height: unset;
    max-height: unset;
    animation: unset;
    display: flex;
    flex-direction: row;
    transform: unset;
  }
`;

export const NavLinks = styled.ul<MenuProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;

  ${({ theme }) => theme.mq.tablet} {
    flex-direction: row;
    width: unset;
    height: 100%;
    gap: 30px;

    &:first-child {
      width: 100%;
      justify-content: center;
    }

    li {
      width: unset;

      a {
        height: 100%;
        width: unset;
        opacity: 1;
        transform: unset;
        transition: unset;
      }
    }
  }
`;

export const NavLink = styled.li<MenuProps & { $isActive: boolean; $isFavorite?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    color: ${({ theme }) => theme.themeColors.font};
    text-decoration: ${({ $isActive }) => ($isActive ? 'underline' : 'none')};
    text-underline-offset: 2px;
    font-size: ${({ theme }) => theme.fontSize.abrilDesktop};
    opacity: ${({ $isCartOpen }) => ($isCartOpen ? 1 : 0)};
    transition: opacity 0.5s ease-in-out;
    transition-delay: ${({ $isCartOpen }) => ($isCartOpen ? '0.5s' : '0.2s')};
    position: relative;

    &:hover {
      text-decoration: underline;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    a[data-favorite]::after {
      content: attr(data-favorite);
      display: ${({ $isFavorite }) => ($isFavorite ? 'flex' : 'none')};
      justify-content: center;
      align-items: center;
      color: white;
      position: absolute;
      top: 50%;
      right: -14px;
      width: 24px;
      height: 24px;
      font-size: ${({ theme }) => theme.fontSize.caption};
      font-family: ${({ theme }) => theme.fontFamily.lato};
      background: ${({ theme }) => theme.colors.orange};
      border-radius: 100px;
      z-index: -1;
      font-weight: 600;
      transform-origin: center;
      opacity: 0;
      animation: ${scaleAnimation} 0.4s forwards;
      animation-delay: 1.4s;
    }
  }
`;

export const NavSubItems = styled.ul<MenuProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.themeColors.secondBackground};
  transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
  ${({ $isCartOpen }) => {
    if ($isCartOpen)
      return `
			transform: translateY(0);
			opacity: 1;
			transition-delay: 0.7s;
		`;
    else
      return `
			transform: translateY(100%);
			opacity: 0;
			transition-delay: 0;
		`;
  }};

  ${({ theme }) => theme.mq.tablet} {
    background-color: ${({ theme }) => theme.themeColors.background};
    transform: unset;
    transition: unset;
    opacity: 1;
    width: unset;
  }
`;

export const NavSubItem = styled.li`
  background-color: transparent;
  height: 100%;
  width: 60px;
  z-index: 1;

  svg {
    height: 24px;
    width: 24px;

    path {
      fill: ${({ theme }) => theme.themeColors.font};
    }
  }

  &:not(:first-child):hover {
    svg path {
      fill: ${({ theme }) => theme.colors.orange};
    }
  }

  a,
  button {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ProfileImage = styled.div`
  border-radius: 100px;
  overflow: hidden;
  display: flex;
  object-fit: contain;
`;
