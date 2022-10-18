import styled from 'styled-components';

export const Results = styled.div<{ $windowHeight: number }>`
  margin-top: 10px;
  overflow-y: auto;
  height: ${({ $windowHeight }) => $windowHeight - 90}px;

  a {
    text-decoration: none;

    &:last-child div {
      border: none;
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    padding: 10px 20px;
    height: unset;
    max-height: calc(100vh - 170px);
  }
`;

export const Error = styled.p`
  margin-top: 10px;
  text-align: center;
  ${({ theme }) => theme.fadeInAnimation(0.4)};
`;

export const FoundItem = styled.div`
  padding: 20px 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.themeColors.border};
  transition: background-color 0.1s ease-in-out;
  ${({ theme }) => theme.fadeInAnimation(0.4)};

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

  &:hover {
    background-color: ${({ theme }) => theme.themeColors.secondBackground};
  }

  ${({ theme }) => theme.mq.tablet} {
    gap: 20px;

    img {
      width: 120px !important;
      height: 120px !important;
    }
  }
`;
