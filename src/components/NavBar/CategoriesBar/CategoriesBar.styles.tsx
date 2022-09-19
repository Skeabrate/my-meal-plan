import styled from 'styled-components';

export const Wrapper = styled.div<{ $isLinkDisabled: boolean }>`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
  border-top: 1px solid ${({ theme }) => theme.colors.blue};
  overflow: hidden;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;

    li {
      height: 40px;

      a {
        background-color: white;
        color: ${({ theme }) => theme.colors.blue};
        padding-inline: 20px;
        display: flex;
        align-items: center;
        text-decoration: none;
        font-weight: 600;
        font-size: ${({ theme }) => theme.fontSize.caption};
        letter-spacing: 1px;
        width: 100%;
        height: 100%;

        pointer-events: ${({ $isLinkDisabled }) => $isLinkDisabled && 'none'};
      }
    }
  }
`;
