import styled from 'styled-components';

export const Categories = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 40px 20px;

  article {
    border: 1px solid ${({ theme }) => theme.colors.grey};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-bottom: 20px;

    transition: border-color 0.2s ease-in-out;

    a {
      text-decoration: none;
      color: black;
    }

    img {
      transition: scale 0.3s ease-in-out;
    }

    &:hover {
      border-color: ${({ theme }) => theme.colors.orange};

      img {
        scale: 1.1;
      }
    }
  }
`;
