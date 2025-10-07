import React, { useState, useMemo } from 'react';
import { Select, SelectProps } from 'antd';

interface RemoteSearchSelectProps extends Omit<SelectProps, 'options' | 'onSearch'> {
  fetchOptions: (search: string) => Promise<any[]>;
  debounceTimeout?: number;
}

const RemoteSearchSelect: React.FC<RemoteSearchSelectProps> = ({ fetchOptions, debounceTimeout = 800, ...props }) => {
  const [options, setOptions] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);

  const debounceFetcher = useMemo(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (value: string) => {
      setFetching(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchOptions(value).then((newOptions) => {
          setOptions(newOptions);
          setFetching(false);
        });
      }, debounceTimeout);
    };
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? '搜索中...' : null}
      options={options}
      {...props}
    />
  );
};

export default RemoteSearchSelect;
