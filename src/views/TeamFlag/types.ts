import { TodoListItemType } from '@/types/todoType';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

export type TeamTodoTableProps = {
  /** 是否锁定 */
  isLock: boolean;
  todoList: TodoListItemType[];
  dragChangeTeamTodoList: (newOrderVal: TodoListItemType[], oldOrderVal: TodoListItemType[]) => Promise<void>;
  /** 刷新 todo 列表 */
  refreshTeamTodoList?: () => Promise<void>;
  /** 锁定团队Flag的回调函数 */
  onLockTeamFlag: () => Promise<void>;
};

/** table Row 组件上下文 */
export type RowContextProps = {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
};

/** table Row 组件属性 */
export type RowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  'data-row-key': string;
};
