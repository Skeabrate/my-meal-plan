import styled from 'styled-components';

export const Footer = styled.footer`
  padding: 8rem 0 4rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  font-style: italic;

  &:after {
    content: '';
    position: absolute;
    top: 30px;
    width: 80%;
    max-width: 1400px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border};
  }

  a {
    margin-bottom: 2rem;
    display: flex;

    &:first-child {
      ${({ theme }) => theme.boxShadow('white')}
    }
  }

  p {
    font-size: 1.4rem;
  }

  img {
    filter: grayscale(1);
  }

  svg {
    path {
      transition: fill 0.2s ease-in-out;
    }

    &:hover path {
      fill: ${({ theme }) => theme.colors.orange};
    }
  }
`;
