import styled from 'styled-components';

export const Wrapper = styled.div`
  p {
    background-color: ${({ theme }) => theme.colors.lightGrey};
    ${({ theme }) => theme.loadingAnimation()};
  }
`;

export const Header = styled.div`
  margin-bottom: 20px;

  p {
    &:first-child {
      height: 40px;
      width: 70%;
      margin-bottom: 20px;
    }

    &:last-child {
      background-color: ${({ theme }) => theme.colors.grey};
      height: 60px;
      width: 100%;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;

    p {
      &:first-child {
        height: 60px;
        margin-bottom: 0;
      }

      &:last-child {
        width: 160px;
      }
    }
  }
`;

export const Content = styled.div`
  ${({ theme }) => theme.mq.desktop} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
  }
`;

export const Gallery = styled.div`
  p {
    background-color: ${({ theme }) => theme.colors.grey};

    &:first-child {
      height: 350px;
      margin-bottom: 10px;
    }

    &:last-child {
      height: 250px;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    p {
      &:first-child {
        height: 600px;
        margin-bottom: 30px;
      }

      &:last-child {
        height: 400px;
      }
    }
  }
`;

export const Tabs = styled.div`
  margin-top: 30px;

  div:first-child {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 8.5px;
    margin-bottom: 20px;

    p {
      height: 60px;
      background-color: ${({ theme }) => theme.colors.grey};
    }
  }

  div:last-child {
    display: grid;
    grid-auto-rows: 60px;
    row-gap: 8.5px;
  }

  ${({ theme }) => theme.mq.desktop} {
    margin-top: 0;
  }
`;
