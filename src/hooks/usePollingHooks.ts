import { useEffect, useState } from 'react';

export const usePolling = <T>(fetchData: () => Promise<T>, interval = 5000, immediate = true) => {
  const [pollingData, setPollingData] = useState<T>();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const poll = async () => {
      const newData = await fetchData();
      setPollingData(newData);
      timeoutId = setTimeout(poll, interval);
    };

    if (immediate) {
      poll(); // 立即执行一次
    } else {
      // 不立即执行，只设置定时器
      timeoutId = setTimeout(poll, interval);
    }

    return () => clearTimeout(timeoutId); // 清除定时器，避免内存泄漏
  }, [fetchData, interval, immediate]);

  return { pollingData };
};
