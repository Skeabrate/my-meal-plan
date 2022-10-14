import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;

  p {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${({ theme }) => theme.mq.tablet} {
    font-size: 1.6rem;
  }
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: -1px;
  list-style: none;
  width: calc(100% + 2px);
  z-index: 1;
  border: 1px solid ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.background};
  ${({ theme }) => theme.fadeInAnimation(0.2)};
`;

export const DropdownListItem = styled.li`
  width: 100%;
  // prevent colapsed outlines
  margin-bottom: 2px;

  &:last-child {
    margin-bottom: 0;
  }

  button {
    height: 40px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    border: none;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondBackground};

      svg path {
        fill: ${({ theme }) => theme.colors.orange};
      }
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.orange};
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    button {
      height: 50px;
    }
  }
`;
