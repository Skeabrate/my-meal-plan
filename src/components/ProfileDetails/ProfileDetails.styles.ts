import styled from 'styled-components';

export const ProfileDetails = styled.div`
  display: grid;
  ${({ theme }) => theme.mq.tablet} {
    grid-template-columns: 180px 1fr;
  }
`;

export const Options = styled.ul`
  position: sticky;
  top: 0px;
  list-style: none;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green};
  border-top: 1px solid ${({ theme }) => theme.colors.green};
  padding: 1px;
  gap: 1px;

  svg {
    height: 24px;
    width: 24px;
  }

  button,
  a {
    text-decoration: none;
    border: none;
    font-weight: 600;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 20px 20px 20px 10px;
    transition: background-color 0.1s ease-in-out;

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
    min-height: 400px;
    height: calc(100vh - 248px);
    border-right: 1px solid ${({ theme }) => theme.colors.green};
    border-bottom: none;

    button,
    a {
      font-size: ${({ theme }) => theme.fontSize.paragraph};
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

  ${({ theme }) => theme.mq.tablet} {
    position: absolute;
    bottom: 1px;
    width: calc(100% - 1px);
  }
`;

export const Tab = styled.div`
  section {
    padding-top: 20px;
    ${({ theme }) => theme.fadeInAnimation(0.4)};

    ${({ theme }) => theme.mq.tablet} {
      padding-top: 0;
      padding-inline: 60px;
    }
  }
`;
