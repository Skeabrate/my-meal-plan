import { useRef } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  ${({ theme }) => theme.fadeInAnimation(0.2)};
  margin-bottom: 20px;
  display: flex;
  gap: 6px;

  input {
    &:last-child {
      font-weight: 600;
      cursor: pointer;
      color: ${({ theme }) => theme.themeColors.secondFont};
    }
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
      <input
        type='submit'
        value='Add'
      />
    </StyledForm>
  );
};

export default OpenInput;
