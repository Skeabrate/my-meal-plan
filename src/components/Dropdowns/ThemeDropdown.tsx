import { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ThemeContext } from 'context/ThemeContext';
import Dropdown from './Dropdown/Dropdown';
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

    p {
      display: flex;

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
          display: grid;
          grid-template-columns: 50px 1fr;
          place-content: center;
          width: 100%;

          span {
            text-align: left;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
          }

          svg {
            margin: 0 auto;
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
    value: 'light',
    Component: (
      <>
        <LightSvg /> <span>light</span>
      </>
    ),
  },
  {
    value: 'dark',
    Component: (
      <>
        <DarkSvg /> <span>dark</span>
      </>
    ),
  },
  {
    value: 'system',
    Component: (
      <>
        <SystemSvg /> <span>system</span>
      </>
    ),
  },
];

const ThemeDropdown = () => {
  const [dropdownValue, setDropdownValue] = useState(options[0].value);

  const { switchThemeStyle } = useContext(ThemeContext);

  useEffect(() => {
    console.log(dropdownValue);
  }, [dropdownValue]);

  return (
    <StyledThemeDropdown>
      <Dropdown
        label='tets'
        options={options}
        dropdownValue={dropdownValue}
        setDropdownValue={setDropdownValue}
      />
    </StyledThemeDropdown>
  );
};

export default ThemeDropdown;
