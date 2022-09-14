import styled, { css, keyframes } from 'styled-components';

type MenuProps = {
  $isCartOpen: boolean;
};

const navBarMobileHeight = '80px';

export const Nav = styled.nav``;

export const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${navBarMobileHeight};
  padding-inline: 10px;
  position: relative;

  a {
    display: flex;
    img {
      height: 60px !important;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    height: 100px;
    padding-inline: 40px;

    a img {
      height: unset !important;
    }
  }
`;

const buttonStyle = css`
  height: 4px;
  width: 36px;
  background-color: #2e2e2e;
  transition-duration: 0.5s;
  border-radius: 100px;
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
    ${buttonStyle};
    position: relative;
    ${({ $isCartOpen }) => $isCartOpen && `transform: rotateZ(-180deg);`};

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: -12px;
      ${buttonStyle};
      ${({ $isCartOpen }) =>
        $isCartOpen && `transform: rotateZ(-45deg) scaleX(0.75) translate(-12px, -4px);`};
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -12px;
      ${buttonStyle};
      ${({ $isCartOpen }) =>
        $isCartOpen && `transform: rotateZ(45deg) scaleX(0.75) translate(-12px, 4px);`};
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    display: none;
  }
`;

const animateSlideCartIn = keyframes`
	from{
		transform: translateX(-100%);
	} to {
		transform: translateX(0);
	}	
`;

const animateSlideCartOut = keyframes`
	from{
		transform: translateX(0);
	} to {
		transform: translateX(100%);
	}	
`;

const animationSlideCartHelper = (animation: any, delay: string = '0s') => css`
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
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  transform: ${({ $isCartOpen }) => ($isCartOpen ? 'translateX(-100%);' : 'translateX(0)')};
  ${({ $isCartOpen }) =>
    $isCartOpen
      ? animationSlideCartHelper(animateSlideCartIn)
      : animationSlideCartHelper(animateSlideCartOut, '0.5s')};

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

    ul {
      flex-direction: row;
      width: unset;
      height: 100%;

      &:first-child {
        width: 100%;
        justify-content: center;
      }

      li {
        width: unset;

        a {
          margin-inline: 10px;
          height: 100%;
          width: unset;
          padding-inline: 10px;
          opacity: 1;
          transform: unset;
          transition: unset;
        }
      }
    }
  }
`;

export const NavLinks = styled.ul<MenuProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
`;

export const NavLink = styled.li<{ $isActive: boolean; $isCartOpen: boolean }>`
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
    font-size: 20px;
    color: black;
    font-weight: 600;
    text-decoration: ${({ $isActive }) => ($isActive ? 'underline' : 'none')};

    opacity: ${({ $isCartOpen }) => ($isCartOpen ? 1 : 0)};
    transition: opacity 0.4s ease-in-out;
    transition-delay: ${({ $isCartOpen }) => ($isCartOpen ? '0.4s' : '0.2s')};

    &:hover {
      text-decoration: underline;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    a {
      font-size: ${({ theme }) => theme.fontSize.paragraph};
    }
  }
`;

export const NavSubItems = styled.ul<MenuProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background-color: rgb(230, 230, 230);

  li {
    height: 100%;
    a {
      width: 80px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: ${({ $isCartOpen }) => ($isCartOpen ? 'translateY(0px)' : 'translateY(40px)')};
      opacity: ${({ $isCartOpen }) => ($isCartOpen ? 1 : 0)};
      transition: all 0.3s ease-in-out;
      transition-delay: ${({ $isCartOpen }) => ($isCartOpen ? '0.6s' : 0)};
    }
  }
`;
