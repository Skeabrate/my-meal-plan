import { ReactNode, useMemo, useState } from 'react';

export type TabType = {
  id: number | string;
  label: string | ReactNode;
  Component: React.ReactNode;
};

export const useTabs = (tabs: TabType[]) => {
  const [activeDetails, setActiveDetails] = useState(tabs[0].id);

  const selectedTab = useMemo(
    () => tabs.find((tab) => tab.id === activeDetails)?.Component,
    [tabs, activeDetails]
  );

  return { activeDetails, setActiveDetails, selectedTab };
};
