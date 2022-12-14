import styled from 'styled-components';

type SlideBarType = {
  $isLinkDisabled: boolean;
};

type ArrowType = {
  $isActive: boolean;
  $left?: boolean;
  $right?: boolean;
} & (
  | {
      $left: boolean;
    }
  | {
      $right: boolean;
    }
);

export const SlideBar = styled.div<SlideBarType>`
  position: relative;
  width: 100%;
  height: 100%;

  ul {
    display: flex;
    margin: 0 auto;
    width: fit-content;
    height: 100%;
    will-change: transform;

    li a {
      height: 100%;
      display: flex;
      align-items: center;
      pointer-events: ${({ $isLinkDisabled }) => $isLinkDisabled && 'none'};

      &:focus {
        outline: none;
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.orange};
        scale: 1.1;
      }
    }
  }
`;

export const Arrow = styled.button<ArrowType>`
  position: absolute;
  background: ${({ theme }) => theme.themeColors.background};
  box-shadow: 0 0 40px 20px ${({ theme }) => theme.themeColors.background};
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  z-index: 1;
  right: ${({ $right }) => $right && 0};
  left: ${({ $left }) => $left && 0};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};

  transition: opacity 0.15s ease-in-out, visibility 0.15s ease-in-out;

  svg {
    width: 30px;
    height: 30px;
    transition: transform 0.2s ease-in-out;

    path {
      fill: ${({ theme }) => theme.themeColors.secondFont};
      transition: fill 0.2s ease-in-out;
    }
  }

  &:hover {
    svg {
      transform: translateX(
        ${({ $left, $right }) => {
          if ($left) return '-2px';
          else if ($right) return '2px';
        }}
      );

      path {
        fill: ${({ theme }) => theme.colors.orange};
      }
    }
  }
`;
