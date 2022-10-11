import styled from 'styled-components';

export const NotFound = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-block: 8rem;

  h1 {
    margin-bottom: 20px;

    &:after {
      width: 100%;
    }
  }

  p {
    font-style: italic;
  }
`;
