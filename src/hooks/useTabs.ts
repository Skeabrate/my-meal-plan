import { useMemo, useState } from 'react';

export type TabsType = {
  label: string;
  Component: React.ReactNode;
}[];

export const useTabs = (tabs: TabsType) => {
  const [activeDetails, setActiveDetails] = useState(tabs[0]?.label);
  const selectedTab = useMemo(
    () => tabs.find((tab) => tab.label === activeDetails)?.Component,
    [tabs, activeDetails]
  );

  return { activeDetails, setActiveDetails, selectedTab };
};
