import React from 'react';
import styled from 'styled-components';

const StyledUnderlinedButton = styled.button<{ $isGreen?: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  border: none;
  background-color: transparent;
  color: ${({ theme, $isGreen }) => ($isGreen ? theme.colors.green : theme.colors.red)};
  text-decoration: underline;
  padding: 3px;
  font-style: italic;
  font-size: 1.3rem;
  transition: 0.1s ease-in-out;

  svg {
    height: 16px;
    width: 16px;

    path {
      fill: ${({ theme, $isGreen }) => ($isGreen ? theme.colors.green : theme.colors.red)};
      transition: 0.1s ease-in-out;
    }
  }

  &:hover {
    background-color: ${({ theme, $isGreen }) =>
      $isGreen ? theme.colors.green : theme.colors.red};
    color: white;
    text-decoration: none;

    svg path {
      fill: white;
    }
  }
`;

const UnderlinedButton = ({
  label,
  onClick,
  isGreen,
}: {
  label: React.ReactNode;
  onClick: () => void;
  isGreen?: boolean;
}) => {
  return (
    <StyledUnderlinedButton
      $isGreen={isGreen}
      onClick={onClick}
    >
      {label}
    </StyledUnderlinedButton>
  );
};

export default UnderlinedButton;
