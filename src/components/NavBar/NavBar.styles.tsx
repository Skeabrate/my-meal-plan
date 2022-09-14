import styled, { css } from 'styled-components';

type HamburgerMenu = {
  $isCartOpen: boolean;
};

export const Nav = styled.nav`
  border-bottom: 1px solid grey;
`;

export const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  a {
    display: flex;
  }
`;

const buttonStyle = css`
  height: 5px;
  width: 40px;
  background-color: ${({ theme }) => theme.colors.black};
  transition-duration: 0.5s;
  border-radius: 100px;
`;

export const HambuergerMenu = styled.button<HamburgerMenu>`
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
      top: -15.5px;
      ${buttonStyle};
      ${({ $isCartOpen }) =>
        $isCartOpen && `transform: rotateZ(-45deg) scaleX(0.75) translate(-20px, -6px);`};
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -15.5px;
      ${buttonStyle};
      ${({ $isCartOpen }) =>
        $isCartOpen && `transform: rotateZ(45deg) scaleX(0.75) translate(-20px, 6px);`};
    }
  }
`;

export const SlideCart = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: red;
  left: 0;
  display: none;
`;
