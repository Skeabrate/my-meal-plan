import styled from 'styled-components';

export const OverlayOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  opacity: 0;
  padding: 1.6rem 0.4rem;
  transition: opacity 0.15s ease-in-out;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};

  h3 {
    font-family: ${({ theme }) => theme.fontFamily.lato};
    font-size: 1.4rem;
    font-weight: 600;
    font-style: normal;
  }

  a {
    font-style: italic;
  }

  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.themeColors.background};
    opacity: 0.7;
    z-index: -1;
  }
`;

export const MealsGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-gap: 2rem;
  height: max-content;
  overflow-y: auto;
  padding-inline: 1rem;

  li {
    font-size: ${({ theme }) => theme.fontSize.caption};
    font-weight: 600;
    height: fit-content;
    position: relative;

    span {
      display: block;
      padding: 3px 3px 0 3px;
    }

    &:hover ${OverlayOptions} {
      opacity: 1;
    }
  }
`;
