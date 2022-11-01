import styled from 'styled-components';

export const ProfileDetails = styled.div``;

export const Options = styled.ul`
  background-color: ${({ theme }) => theme.colors.green};
`;

export const Button = styled.button<{ $isActive: boolean }>``;

export const Tab = styled.div`
  section {
    padding: 20px 0;
    ${({ theme }) => theme.fadeInAnimation(0.4)};

    ${({ theme }) => theme.mq.tablet} {
      padding: 30px 20px;
    }
  }
`;
