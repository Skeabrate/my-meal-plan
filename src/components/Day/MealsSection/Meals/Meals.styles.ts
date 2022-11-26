import styled from 'styled-components';

export const MealsGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 1rem;

  li,
  button {
    font-size: ${({ theme }) => theme.fontSize.caption};
  }

  li {
    font-weight: 600;
    height: fit-content;

    span {
      display: block;
      padding: 3px 3px 0 3px;
    }

    img {
      transition: scale 0.2s ease-in-out;

      &:hover {
        scale: 1.05;
      }
    }
  }
`;

export const Info = styled.p`
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-style: italic;
`;
