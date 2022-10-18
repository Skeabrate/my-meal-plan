import { useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { isSystemThemeSettingSetToDark, ThemeContext, ThemeTypes } from 'context/ThemeContext';
import Dropdown from './Dropdown/Dropdown';
import { useDropdownValue } from './Dropdown/useDropdownValue';
import LightSvg from 'assets/SVG/Light.svg';
import DarkSvg from 'assets/SVG/Dark.svg';
import SystemSvg from 'assets/SVG/System.svg';

const fadeInReverseAnimation = keyframes`
	from {
		opacity: 0;
		transform: translateY(10px);
	} to{
		opacity: 1;
		transform: translateY(0);
	}
`;

const StyledThemeDropdown = styled.div`
  height: 100%;
  width: 100%;

  div {
    height: 100%;
    background-color: ${({ theme }) => theme.colors.secondBackground};

    p span {
      display: none;
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
      background-color: ${({ theme }) => theme.colors.background};

      ul {
        top: 90px;
        ${({ theme }) => theme.fadeInAnimation(0.2)};
      }
    }
  }
`;

const options = [
  {
    id: 0,
    value: ThemeTypes.Light,
    Component: (
      <>
        <LightSvg /> <span>light</span>
      </>
    ),
  },
  {
    id: 1,
    value: ThemeTypes.Dark,
    Component: (
      <>
        <DarkSvg /> <span>dark</span>
      </>
    ),
  },
  {
    id: 2,
    value: isSystemThemeSettingSetToDark ? ThemeTypes.Dark : ThemeTypes.Light,
    Component: (
      <>
        <SystemSvg /> <span>system</span>
      </>
    ),
  },
];

const ThemeDropdown = () => {
  const { themeStyle, setThemeStyle } = useContext(ThemeContext);
  const initialDropdownValue = options.find((option) => option.value === themeStyle);

  const { dropdownValue, setDropdownValue } = useDropdownValue({
    id: initialDropdownValue!.id,
    value: initialDropdownValue!.value,
  });

  useEffect(() => {
    setThemeStyle(dropdownValue.value);
  }, [dropdownValue, setThemeStyle]);

  return (
    <StyledThemeDropdown>
      <Dropdown
        options={options}
        dropdownValue={dropdownValue}
        setDropdownValue={setDropdownValue}
      />
    </StyledThemeDropdown>
  );
};

export default ThemeDropdown;
