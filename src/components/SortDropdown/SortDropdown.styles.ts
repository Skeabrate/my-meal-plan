import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.2rem;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.orange};
    ${({ theme }) => theme.boxShadow(theme.colors.orange)};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.orange};
    outline: 2px solid ${({ theme }) => theme.colors.orange};
  }

  ${({ theme }) => theme.mq.tablet} {
    width: 150px;
    height: 50px;
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
  box-shadow: 0px 0px 15px -10px ${({ theme }) => theme.colors.font};
`;

export const DropdownListItem = styled.li`
  &:first-child {
    margin-bottom: 2px;
  }

  button {
    height: 40px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    border: none;
    text-align: center;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondBackground};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.orange};
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    button {
      height: 50px;
      padding: 15px 20px;
      text-align: left;
    }
  }
`;
