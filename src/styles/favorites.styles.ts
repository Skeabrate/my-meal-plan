import styled from 'styled-components';

export const SignIn = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-color: ${({ theme }) => theme.colors.green};
  width: 100%;
  padding: 50px 20px;
  margin-top: 60px;
  ${({ theme }) => theme.boxShadow(theme.colors.green)};

  p {
    font-weight: 600;
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSize.headingMobile};
    font-style: italic;
    color: white;
    text-align: center;

    span {
      display: block;
      font-size: ${({ theme }) => theme.fontSize.paragraph};
      font-weight: 400;
      text-transform: none;
    }
  }

  a {
    background-color: white;
    padding: 20px 40px;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.green}, 0 0 0 2px white;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.green};
    font-weight: 600;
    text-transform: uppercase;
    font-style: italic;
    width: fit-content;
    transition: scale 0.1s ease-in-out;

    &:hover {
      scale: 1.05;
    }
  }
`;
