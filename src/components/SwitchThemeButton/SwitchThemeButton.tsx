import { useContext } from 'react';
import { ThemeContext } from 'context/ThemeContext';

const SwitchThemeButton = () => {
  const { switchThemeStyle } = useContext(ThemeContext);

  return <button onClick={switchThemeStyle}>switch theme</button>;
};

export default SwitchThemeButton;
