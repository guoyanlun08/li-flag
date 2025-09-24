import { useEffect, useState } from 'react';

export const usePolling = <T>(fetchData: () => Promise<T>, interval = 5000) => {
  const [pollingData, setPollingData] = useState<T>();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const poll = async () => {
      const newData = await fetchData();
      setPollingData(newData);
      timeoutId = setTimeout(poll, interval);
    };

    poll();

    return () => clearTimeout(timeoutId); // 清除定时器，避免内存泄漏
  }, [fetchData, interval]);

  return { pollingData };
};
