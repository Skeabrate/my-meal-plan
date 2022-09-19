import styled from 'styled-components';

export const Wrapper = styled.div<{ $isLinkDisabled: boolean }>`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
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
