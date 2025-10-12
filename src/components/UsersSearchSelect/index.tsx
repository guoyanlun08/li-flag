import React, { useState } from 'react';
import { Select, SelectProps, message } from 'antd';

import { searchUsers } from '@/apis/user';
import { useDebounce } from '@/hooks';

interface UsersSearchSelectProps extends Omit<SelectProps, 'options' | 'onSearch'> {}

const UsersSearchSelect: React.FC<UsersSearchSelectProps> = ({ ...props }) => {
  const [fetching, setFetching] = useState(false);
  const [userList, setUserList] = useState<{ label: string; value: string }[]>([]);
  const searchDebounce = useDebounce();

  /* 远程搜索用户 */
  const searchUserRequest = async (search: string) => {
    try {
      setFetching(true);
      const res = await searchUsers({ userId: search });
      setUserList(
        res.map((user) => ({
          label: user.userId,
          value: user.userId
        }))
      );
    } catch (error) {
      message.error('搜索用户失败');
      setUserList([]);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      filterOption={false}
      onFocus={() => {
        searchUserRequest('');
      }}
      onSearch={(value) => {
        searchDebounce(searchUserRequest, 1000, value);
      }}
      notFoundContent={fetching ? '搜索中...' : null}
      options={userList}
      {...props}
    />
  );
};

export default UsersSearchSelect;
