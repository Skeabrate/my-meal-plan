import styled from 'styled-components';

export const MealDetails = styled.section`
  position: sticky;
  top: 1px;
  height: fit-content;
`;

export const ButtonsBar = styled.header`
  display: flex;
  gap: 3px;
  background-color: ${({ theme }) => theme.colors.green};

  h2 {
    width: 100%;
    margin: 0;
    line-height: 1.2rem;

    &::after {
      display: none;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    h2 {
      line-height: 1.4rem;
    }
  }
`;

export const Button = styled.button<{ $isActive: boolean }>`
  width: 100%;
  border: none;
  padding-block: 2rem;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.caption};
  transition: background-color 0.1s ease-in-out;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.green : theme.colors.background};
  color: ${({ $isActive, theme }) => ($isActive ? 'white' : theme.colors.font)};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.background};
  margin-bottom: 2px;

  &:hover {
    background-color: ${({ $isActive, theme }) => !$isActive && theme.colors.lightGrey};
  }

  ${({ theme }) => theme.mq.tablet} {
    font-size: 1.4rem;
  }
`;

export const DetailsWrapper = styled.div`
  padding: 20px 0;

  article {
    ${({ theme }) => theme.fadeInAnimation(0.4)};
  }

  ${({ theme }) => theme.mq.tablet} {
    padding: 30px 20px;
  }

  ${({ theme }) => theme.mq.desktop} {
    overflow-y: auto;
    max-height: calc(100vh - 59px);
  }
`;
