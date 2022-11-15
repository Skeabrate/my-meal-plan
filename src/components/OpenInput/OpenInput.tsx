import { useRef } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  ${({ theme }) => theme.fadeInAnimation(0.2)};

  input {
    border: 2px solid ${({ theme }) => theme.themeColors.secondFont};
    padding: 10px;
    margin-bottom: 10px;
  }
`;

const OpenInput = ({
  label,
  placeholder,
  updateMealPLans,
}: {
  label: string;
  placeholder: string;
  updateMealPLans: (inputValue: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    inputRef.current && updateMealPLans(inputRef.current.value);
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <input
        type='text'
        placeholder={placeholder}
        ref={inputRef}
        aria-label={label}
        required
        maxLength={50}
        autoFocus
      />
    </StyledForm>
  );
};

export default OpenInput;
