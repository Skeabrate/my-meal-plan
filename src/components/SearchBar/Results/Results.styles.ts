import styled from 'styled-components';

export const Results = styled.div<{ $windowHeight: number }>`
  margin-top: 10px;
  overflow-y: auto;
  height: ${({ $windowHeight }) => $windowHeight - 130}px;

  div,
  p {
    ${({ theme }) => theme.fadeInAnimation(0.4)};
  }

  a {
    color: black;
    text-decoration: none;

    &:last-child div {
      border: none;
    }

    &:hover div {
      background-color: ${({ theme }) => theme.colors.lightGrey};
    }
  }

  p {
    margin-top: 10px;
    text-align: center;
  }

  ${({ theme }) => theme.mq.tablet} {
    padding: 10px 20px;
    height: unset;
    max-height: calc(100vh - 170px);
  }
`;

export const FoundItem = styled.div`
  padding: 20px 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  transition: background-color 0.1s ease-in-out;

  div {
    background-color: ${({ theme }) => theme.colors.grey};
    display: flex;
  }

  ul {
    list-style: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    li {
      font-size: ${({ theme }) => theme.fontSize.caption};
      font-style: italic;
      margin-block: 4px;

      &:first-child {
        font-weight: 600;
        font-size: ${({ theme }) => theme.fontSize.paragraph};
        font-style: normal;
      }
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    gap: 20px;

    img {
      width: 120px !important;
      height: 120px !important;
    }
  }
`;
