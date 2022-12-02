import { ReactNode, useMemo, useState } from 'react';

export type TabType<T> = {
  id: T;
  label: string | ReactNode;
  Component: React.ReactNode;
};

export const useTabs = <T>(tabs: TabType<T>[]) => {
  const [activeDetails, setActiveDetails] = useState(tabs[0].id);

  const selectedTab = useMemo(
    () => tabs.find((tab) => tab.id === activeDetails)?.Component,
    [tabs, activeDetails]
  );

  return { activeDetails, setActiveDetails, selectedTab };
};
