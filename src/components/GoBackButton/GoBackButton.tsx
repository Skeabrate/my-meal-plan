import styled from 'styled-components';
import Arrow from 'assets/SVG/LeftArrow.svg';
import { useContext } from 'react';
import { HistoryContext } from 'context/HistoryContext';

const StyledGoBackButton = styled.button`
  background-color: ${({ theme }) => theme.themeColors.background};
  border: none;
  padding: 0 20px 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.themeColors.secondFont};

  svg {
    height: 20px;
    width: 20px;
    transition: 0.1s ease-in-out;

    path {
      fill: ${({ theme }) => theme.themeColors.secondFont};
    }
  }

  &:hover {
    svg {
      transform: translateX(-2px);
    }
  }
`;

const GoBackButton = ({ label = 'Back', callback }: { label?: string; callback?: () => void }) => {
  const { goBack } = useContext(HistoryContext);

  return (
    <StyledGoBackButton onClick={callback || goBack}>
      <Arrow />
      {label}
    </StyledGoBackButton>
  );
};

export default GoBackButton;
