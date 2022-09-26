import { useState, useEffect, useMemo } from 'react';

const ITEMS_PER_PAGE = 8;

export const usePaginate = (data: any[], loadingRef: { current: HTMLDivElement | null }) => {
  const [itemsCount, setItemsCount] = useState(ITEMS_PER_PAGE);

  const currentData = data.slice(0, itemsCount);

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };
  }, []);

  const callbackFunction = (entries: any) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setItemsCount((state) => state + ITEMS_PER_PAGE);
    }
  };

  useEffect(() => {
    if (!loadingRef.current) return;
    const observer = new IntersectionObserver(callbackFunction, options);
    const currRef = loadingRef.current;

    if (currRef) observer.observe(currRef);

    return () => currRef && observer.unobserve(currRef);
  }, [options, loadingRef, data]);

  useEffect(() => {
    setItemsCount(ITEMS_PER_PAGE);
  }, [data]);

  return { currentData };
};
