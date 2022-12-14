import { useContext, useEffect } from 'react';
import styles, { keyframes } from 'styled-components';
import { isSystemThemeSettingSetToDark, ThemeContext, ThemeTypes } from 'context/ThemeContext';
import Combobox from './template/Combobox';
import { useComboboxValue } from './template/useComboboxValue';
import LightSvg from 'assets/SVG/Light';
import DarkSvg from 'assets/SVG/Dark';
import SystemSvg from 'assets/SVG/System';

class Option {
  id: number;
  value: ThemeTypes;
  Component: React.ReactNode;

  constructor(id: number, value: ThemeTypes, Component: React.ReactNode) {
    this.id = id;
    this.value = value;
    this.Component = Component;
  }
}

const styled = { keyframes, ...styles };

const fadeInReverseAnimation = styled.keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledThemeCombobox = styled.div`
  height: 100%;
  width: 100%;

  div {
    p {
      background-color: ${({ theme }) => theme.themeColors.secondBackground};

      span {
        display: none;
      }
    }

    ul {
      animation: ${fadeInReverseAnimation} 0.2s forwards;
      top: -120px;
      width: 120px;

      li {
        width: 100%;

        button {
          display: flex;
          align-items: center;

          svg {
            margin: 0 13px;
          }
        }
      }
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    div {
      p {
        background-color: ${({ theme }) => theme.themeColors.background};
      }

      ul {
        top: 90px;
        ${({ theme }) => theme.fadeInAnimation(0.2)};
      }
    }
  }
`;

const options = [
  new Option(
    0,
    ThemeTypes.Light,
    (
      <>
        <LightSvg /> <span>light</span>
      </>
    )
  ),
  new Option(
    1,
    ThemeTypes.Dark,
    (
      <>
        <DarkSvg /> <span>dark</span>
      </>
    )
  ),
  new Option(
    2,
    isSystemThemeSettingSetToDark ? ThemeTypes.Dark : ThemeTypes.Light,
    (
      <>
        <SystemSvg /> <span>system</span>
      </>
    )
  ),
];

const ThemeCombobox = () => {
  const { themeStyle, setThemeStyle } = useContext(ThemeContext);
  const initialComboboxValue = options.find((option) => option.value === themeStyle)!;

  const { comboboxValue, setComboboxValue } = useComboboxValue({
    id: initialComboboxValue.id,
    value: initialComboboxValue.value,
  });

  useEffect(() => {
    setThemeStyle(comboboxValue.value);
  }, [comboboxValue, setThemeStyle]);

  return (
    <StyledThemeCombobox>
      <Combobox
        ariaLabel='open theme combobox'
        options={options}
        comboboxValue={comboboxValue}
        setComboboxValue={setComboboxValue}
      />
    </StyledThemeCombobox>
  );
};

export default ThemeCombobox;
