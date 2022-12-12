import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Styled from './Combobox.styles';

type ComboboxValueType<T> = {
  id: number;
  value: T;
};

// label or ComboboxValue must be provided
type ComboboxType<T> = {
  options: { id: number; value: T; Component?: React.ReactNode }[];
  ariaLabel?: string;
} & (
  | {
      label?: string;
      comboboxValue: ComboboxValueType<T>;
      setComboboxValue: React.Dispatch<React.SetStateAction<ComboboxValueType<T>>>;
    }
  | {
      label: string;
      comboboxValue: ComboboxValueType<T> | undefined;
      setComboboxValue: React.Dispatch<React.SetStateAction<ComboboxValueType<T> | undefined>>;
    }
);

const Combobox = <T extends string>({
  label,
  ariaLabel,
  options,
  comboboxValue,
  setComboboxValue,
}: ComboboxType<T>) => {
  const [toggleCombobox, setToggleCombobox] = useState(false);

  const comboboxRef = useRef<HTMLDivElement>(null);

  const handleCombobox = useCallback((e: MouseEvent) => {
    if (comboboxRef.current && e.target === comboboxRef.current) {
      setToggleCombobox((state) => !state);
    } else {
      setToggleCombobox(false);
    }
  }, []);

  const getLabel = useMemo(
    () =>
      (options.find((option) => option.id === comboboxValue?.id)?.Component ??
        comboboxValue?.value) ||
      label,
    [comboboxValue, label, options]
  );

  useEffect(() => {
    document.addEventListener('click', handleCombobox);

    return () => {
      document.removeEventListener('click', handleCombobox);
    };
  }, [handleCombobox]);

  return (
    <Styled.Wrapper
      ref={comboboxRef}
      role='button'
      aria-label={label || ariaLabel || 'open combobox'}
      aria-pressed={toggleCombobox}
      tabIndex={0}
      onKeyDown={(e) => e.keyCode === 13 && setToggleCombobox((state) => !state)}
    >
      <Styled.Label>{getLabel}</Styled.Label>

      {toggleCombobox && (
        <Styled.ComboboxList>
          {options.map(({ id, value, Component }) => (
            <Styled.ComboboxListItem key={id}>
              <button
                onKeyDown={(e) => e.keyCode === 13 && setComboboxValue({ id, value })}
                onClick={() => setComboboxValue({ id, value })}
              >
                {Component || value}
              </button>
            </Styled.ComboboxListItem>
          ))}
        </Styled.ComboboxList>
      )}
    </Styled.Wrapper>
  );
};

export default Combobox;
