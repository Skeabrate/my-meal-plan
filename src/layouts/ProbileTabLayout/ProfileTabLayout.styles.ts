import styled from 'styled-components';

export const Tab = styled.section<{ $noAnimation?: boolean }>`
  z-index: 1;
  padding-top: 20px;

  header {
    h1 {
      ${({ theme }) => theme.slideInAnimation(0.4)};
      margin-bottom: 2rem;

      &::after {
        display: none;
      }
    }
  }

  article {
    ${({ theme, $noAnimation }) => !$noAnimation && theme.fadeInAnimation(0.4)};
  }

  ${({ theme }) => theme.mq.tablet} {
    padding-top: 0;

    header {
      position: relative;
      display: flex;
      align-items: center;
      height: 61px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.green};

      h1 {
        margin: 0;
        padding-left: 3rem;
        color: white;
        font-size: 3.6rem;
        font-weight: 400;
      }

      &::after {
        content: '';
        position: absolute;
        width: calc(100% - 1px);
        height: calc(100% - 1px);
        bottom: 1px;
        left: 1px;
        background-color: ${({ theme }) => theme.colors.green};
      }
    }

    article {
      padding: 3rem;
    }
  }

  ${({ theme }) => theme.mq.desktop} {
    header {
      h1 {
        padding-left: 5rem;
      }
    }

    article {
      padding: 5rem;
    }
  }
`;
