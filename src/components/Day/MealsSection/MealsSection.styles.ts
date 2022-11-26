import styled from 'styled-components';

export const MealsSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.themeColors.border};
  padding: 6px 0 20px;

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
  }
`;
