import styled from 'styled-components';

export const SubDropdown = styled.ul`
  ${({ theme }) => theme.fadeInAnimation(0.2)};
  position: absolute;
  background-color: ${({ theme }) => theme.themeColors.background};
  width: 100%;
  top: 100%;
  margin-top: 8px;
  list-style: none;
`;
