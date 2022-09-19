import { useEffect, useState } from 'react';
import { debounce } from 'utils/debounce';

export const useResizeWindow = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const debounceSetWindowHeightOnResize = debounce(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  }, 300);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', debounceSetWindowHeightOnResize);

    return () => window.removeEventListener('resize', debounceSetWindowHeightOnResize);
  }, [debounceSetWindowHeightOnResize]);

  return { windowWidth, windowHeight };
};
