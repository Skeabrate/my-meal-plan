import styled from 'styled-components';

export const ProfileDetails = styled.div`
  display: grid;
  ${({ theme }) => theme.mq.tablet} {
    grid-template-columns: 180px 1fr;
  }
`;

export const SideBar = styled.div`
  ${({ theme }) => theme.mq.tablet} {
    position: sticky;
    top: 0;
    min-height: calc(100vh - 188px);
    height: 100%;
    max-height: 100vh;
    border-right: 1px solid ${({ theme }) => theme.colors.green};
    padding-bottom: 80px; // to prevent logout button overflow when content is too small
  }

  ${({ theme }) => theme.mq.desktop} {
    min-height: calc(100vh - 208px);
  }
`;

export const BackButton = styled.div`
  padding-left: 10px;

  ${({ theme }) => theme.mq.tablet} {
    padding: 20px 0 0 10px;
  }
`;

export const Options = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green};
  border-top: 1px solid ${({ theme }) => theme.colors.green};
  padding: 1px 0 1px 0;

  svg {
    height: 24px;
    width: 24px;
  }

  button,
  a {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    border: none;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.4rem;
    padding: 20px 20px 20px 10px;
    transition: 0.1s ease-in-out;

    &::after {
      content: '';
      position: absolute;
      background-color: white;
      width: 30px;
      height: 4px;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 100px;
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-right: 20px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.themeColors.secondBackground};
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    border-bottom: none;
    padding: 1px 1px 1px 0;

    button,
    a {
      font-size: ${({ theme }) => theme.fontSize.paragraph};

      &::after {
        width: 6px;
        height: 6px;
      }
    }
  }
`;

export const Button = styled.button<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) => ($isActive ? 'white' : theme.themeColors.font)};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.green : theme.themeColors.background};

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.green : theme.themeColors.secondBackground} !important;
  }

  svg path {
    fill: ${({ theme, $isActive }) => ($isActive ? 'white' : theme.themeColors.font)};
  }
`;

export const Logout = styled.li`
  button {
    background: transparent;
  }

  &:hover {
    button {
      background-color: ${({ theme }) => theme.colors.red};
      color: white;
    }

    svg path {
      fill: white;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    position: absolute;
    bottom: 1px;
    left: 0;
    width: calc(100% - 1px);
  }
`;

export const Tab = styled.div`
  section {
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
      ${({ theme }) => theme.fadeInAnimation(0.4)};
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
  }
`;
