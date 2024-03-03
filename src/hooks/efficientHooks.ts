// 效能 hooks

import { useRef } from 'react';

/** 防抖 hook */
export function useDebounce() {
  const timerRef = useRef<any>();

  return (cb: Function, delay: number = 1000, ...args: any[]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
