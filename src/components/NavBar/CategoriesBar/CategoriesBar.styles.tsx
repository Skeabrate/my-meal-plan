import styled from 'styled-components';

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

export const Wrapper = styled.div<{ $isLinkDisabled: boolean }>`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  overflow: hidden;
  position: relative;

  ul {
    list-style: none;
    display: flex;
    margin: 0 auto;
    width: fit-content;
    height: 60px;

    li {
      position: relative;

      a {
        height: 100%;
        padding-inline: 30px;
        text-align: center;
        display: flex;
        justify-content: center;
        color: ${({ theme }) => theme.colors.blue};
        display: flex;
        align-items: center;
        text-decoration: none;
        font-weight: 600;
        font-size: ${({ theme }) => theme.fontSize.caption};
        letter-spacing: 0.5px;
        pointer-events: ${({ $isLinkDisabled }) => $isLinkDisabled && 'none'};
        transition: scale 0.2s ease-in-out;

        &:hover {
          scale: 1.1;
        }
      }

      &:not(:first-child)::after {
        content: '';
        position: absolute;
        background-color: ${({ theme }) => theme.colors.grey};
        width: 4px;
        height: 4px;
        border-radius: 100px;
        left: -2px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    ul {
      height: 40px;
    }
  }
`;

export const Arrow = styled.button<ArrowType>`
  position: absolute;
  background: white;
  box-shadow: 0 0 40px 20px white;
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
