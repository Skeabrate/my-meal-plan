import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useProfileDetailsPathChange = (
  tabs: any[],
  setActiveDetails: React.Dispatch<React.SetStateAction<number>>
) => {
  const [loadingTab, setLoadingTab] = useState(false);
  const router = useRouter();

  const removeSpaces = (string: string) => string.replace(/\s/g, '');

  const changeTabPath = (query: string, tabId: number) => {
    setActiveDetails(tabId);
    router.push({
      query: { activeTab: removeSpaces(query) },
    });
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const hasTabNotChanged = url.includes(router.query.activeTab as string);
      if (hasTabNotChanged) return;

      setLoadingTab(true);
    };

    const handleRouteComplete = (url: string) => {
      setLoadingTab(false);

      const newActiveDetails = tabs.find(
        (tab) => removeSpaces(tab?.label?.props.children[1]) === router.query?.activeTab
      )?.id;

      newActiveDetails ? setActiveDetails(newActiveDetails) : setActiveDetails(tabs[0].id);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteComplete);
    };
  }, [router.events, router.query.activeTab, setActiveDetails, tabs]);

  return { loadingTab, changeTabPath };
};
