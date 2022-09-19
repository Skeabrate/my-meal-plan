import React, { useMemo } from 'react';
import { useResizeWindow } from 'hooks/useResizeWindow';

type ResizeWindowContextType = {
  windowWidth: number;
  windowHeight: number;
};

export const ResizeWindowContext = React.createContext({} as ResizeWindowContextType);

export default function ResizeWindowProvider({ children }: { children: React.ReactNode }) {
  const { windowWidth, windowHeight } = useResizeWindow();

  const value = useMemo(
    () => ({
      windowWidth,
      windowHeight,
    }),
    [windowWidth, windowHeight]
  );

  return <ResizeWindowContext.Provider value={value}>{children}</ResizeWindowContext.Provider>;
}
