import React from 'react';
import styled from 'styled-components';

const StyledUnderlinedButton = styled.button<{ $isGreen?: boolean }>`
  display: block;
  border: none;
  background-color: transparent;
  color: ${({ theme, $isGreen }) => ($isGreen ? theme.colors.green : theme.colors.red)};
  text-decoration: underline;
  padding: 3px;
  font-style: italic;
  font-size: 1.3rem;
  transition: 0.1s ease-in;

  &:hover {
    background-color: ${({ theme, $isGreen }) =>
      $isGreen ? theme.colors.green : theme.colors.red};
    color: white;
    text-decoration: none;
  }
`;

const UnderlinedButton = ({
  label,
  onClick,
  isGreen,
}: {
  label: string;
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
