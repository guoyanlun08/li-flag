import { useEffect, useState } from 'react';
import { searchUsers } from '@/apis/user';

type UserList = {
  avatarPath: string;
  nickName: string;
  userId: string;
};

/**
 * 搜索用户
 */
export function useUserList(userId: string) {
  const [userList, setUserList] = useState<UserList[]>([]);

  useEffect(() => {
    async function handleUserList() {
      const result = await searchUsers({ userId });
      setUserList(result);
    }

    handleUserList();
  }, [userId]);

  return { userList };
}
