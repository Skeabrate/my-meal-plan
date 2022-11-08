import styled from 'styled-components';

export const MealPlan = styled.div`
  border-top: 1px solid ${({ theme }) => theme.themeColors.border};
  padding: 6px 0 20px;

  ul {
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
  }

  ${({ theme }) => theme.mq.tablet} {
    padding: 6px 0 28px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    font-family: ${({ theme }) => theme.fontFamily.lato};
    font-weight: 600;
    font-style: normal;
    font-size: 2rem;
    text-transform: capitalize;
  }
`;

export const OptionsButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 100px;
  background-color: transparent;
  transition: 0.1s ease-in-out;

  span {
    width: 4px;
    height: 4px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.themeColors.font};
  }

  &:hover {
    background-color: ${({ theme }) => theme.themeColors.secondBackground};
  }
`;
