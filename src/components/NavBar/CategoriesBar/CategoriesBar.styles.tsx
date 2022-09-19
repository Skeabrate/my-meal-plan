import styled from 'styled-components';

export const Wrapper = styled.div<{ $isLinkDisabled: boolean }>`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
  border-top: 1px solid ${({ theme }) => theme.colors.blue};
  overflow: hidden;

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
        background-color: white;
        display: flex;
        justify-content: center;
        color: ${({ theme }) => theme.colors.blue};
        display: flex;
        align-items: center;
        text-decoration: none;
        font-weight: 600;
        font-size: ${({ theme }) => theme.fontSize.caption};
        letter-spacing: 1px;
        pointer-events: ${({ $isLinkDisabled }) => $isLinkDisabled && 'none'};
      }

      &:not(:first-child)::after {
        content: '';
        position: absolute;
        background-color: ${({ theme }) => theme.colors.blue};
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
