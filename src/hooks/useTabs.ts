import { ReactNode, useMemo, useState } from 'react';

export type TabType = {
  id: number;
  label: string | ReactNode;
  Component: React.ReactNode;
};

export const useTabs = (tabs: TabType[]) => {
  const [activeDetails, setActiveDetails] = useState(tabs[0]?.label);
  const selectedTab = useMemo(
    () => tabs.find((tab) => tab.label === activeDetails)?.Component,
    [tabs, activeDetails]
  );

  return { activeDetails, setActiveDetails, selectedTab };
};
