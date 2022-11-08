import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useProfileDetailsPathChange = (tabs: any[], setActiveDetails: any) => {
  const [loadingTab, setLoadingTab] = useState(false);
  const router = useRouter();

  const changeTabPath = (query: string) => {
    setLoadingTab(true);
    router.push({
      query: { activeTab: query },
    });
  };

  useEffect(() => {
    const newTab = tabs.find(
      (tab) => tab?.label?.props.children[1] === router.query?.activeTab
    )?.id;

    newTab ? setActiveDetails(newTab) : setActiveDetails(tabs[0].id);
    setLoadingTab(false);
  }, [router.query, tabs, setActiveDetails]);

  return { loadingTab, changeTabPath };
};
