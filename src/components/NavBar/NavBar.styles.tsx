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
  height: 90px;
  padding-inline: 10px;

  a {
    display: flex;
  }
`;

const buttonStyle = css`
  height: 4px;
  width: 36px;
  background-color: #2e2e2e;
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

export const SlideCart = styled.div`
  position: absolute;
  top: 90px;
  left: 0;
  width: 100%;
  height: calc(100vh - 90px);
  background-color: grey;
`;
