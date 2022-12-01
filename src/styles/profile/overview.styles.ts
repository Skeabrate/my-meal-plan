import styled from 'styled-components';

export const ProfileInformations = styled.div`
  margin-bottom: 2rem;
  border-radius: 4px;

  ${({ theme }) => theme.mq.tablet} {
    margin-bottom: 3rem;
  }

  ${({ theme }) => theme.mq.desktop} {
    display: grid;
    grid-template-columns: 300px 1fr;
    box-shadow: 0px 0px 6px -4px rgba(0, 0, 0, 1);
    border-bottom: 3px solid ${({ theme }) => theme.themeColors.border};
    padding: 4rem 0;
  }
`;

export const ProfileImage = styled.div`
  display: flex;
  border-radius: 100px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.themeColors.border};
  height: 140px;
  width: 140px;
  margin: 0 auto 2rem;

  ${({ theme }) => theme.mq.desktop} {
    margin: 0 auto;
  }
`;

export const ProfileDetails = styled.div`
  color: ${({ theme }) => theme.themeColors.secondFont};
  box-shadow: 0px 0px 6px -4px rgba(0, 0, 0, 1);
  border-bottom: 3px solid ${({ theme }) => theme.themeColors.border};
  border-radius: 4px;
  padding: 1rem;

  p,
  button {
    display: flex;
    align-items: flex-end;
    gap: 0.6rem;

    svg {
      width: 20px;
      height: 20px;

      path {
        fill: ${({ theme }) => theme.themeColors.secondFont};
      }
    }
  }

  div {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  button {
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.red};
    font-weight: 600;
    font-style: italic;
    text-decoration: underline;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.red};
      }
    }

    span {
      border-color: ${({ theme }) => theme.colors.red} ${({ theme }) => theme.colors.red}
        transparent !important;
      width: 20px !important;
      height: 20px !important;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    padding: 2rem;

    div {
      margin-bottom: 3rem;
    }
  }

  ${({ theme }) => theme.mq.desktop} {
    box-shadow: unset;
    border-bottom: unset;
    padding-left: 0;
  }
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-block: 1rem;
    align-items: center;
    box-shadow: 0px 0px 6px -4px rgba(0, 0, 0, 1);
    border-radius: 4px;

    &:first-child {
      border-bottom: 3px solid ${({ theme }) => theme.colors.green};
    }

    &:nth-child(2) {
      border-bottom: 3px solid ${({ theme }) => theme.colors.red};
    }

    &:nth-child(3) {
      border-bottom: 3px solid orange;
    }
  }

  h2 {
    font-family: ${({ theme }) => theme.fontFamily.lato};
    font-size: ${({ theme }) => theme.fontSize.caption};
    margin: 0;
    color: ${({ theme }) => theme.themeColors.secondFont};
    font-weight: 400;

    ::after {
      display: none;
    }
  }

  p {
    font-size: 2.2rem;
    font-weight: 600;
  }

  ${({ theme }) => theme.mq.tablet} {
    gap: 3rem;

    h2 {
      font-size: 1.4rem;
    }

    p {
      font-size: 4rem;
    }
  }
`;
