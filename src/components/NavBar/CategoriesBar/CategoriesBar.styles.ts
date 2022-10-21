import styles, { keyframes } from 'styled-components';

const styled = { keyframes, ...styles };

const scaleAnimation = styled.keyframes`
  from {
    scale: 0;
    opacity: 0;
  }
  to {
    scale: 1;
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.themeColors.border};
  border-top: 1px solid ${({ theme }) => theme.themeColors.border};
  overflow: hidden;
  width: 100%;
  height: 62px;

  ul {
    list-style: none;

    li {
      position: relative;

      a {
        padding-inline: 30px;
        color: ${({ theme }) => theme.themeColors.secondFont};
        text-decoration: none;
        font-weight: 600;
        font-size: ${({ theme }) => theme.fontSize.caption};
        letter-spacing: 0.5px;
        transition: transform 0.2s ease-in-out;
        scale: 0;
        opacity: 0;
        animation: ${scaleAnimation} 0.5s forwards;

        &:hover {
          transform: scale(1.1);
        }
      }

      &:not(:first-child)::after {
        content: '';
        position: absolute;
        background-color: ${({ theme }) => theme.themeColors.border};
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
    height: 48px;
  }
`;
