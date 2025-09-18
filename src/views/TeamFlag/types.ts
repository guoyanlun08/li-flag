import { TodoListItemType } from '@/types/todoType';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

export type teamFlagInfo = {};

export type TeamTodoTableProps = {
  todoList: TodoListItemType[];
  dragChangeTeamTodoList: (newOrderVal: TodoListItemType[], oldOrderVal: TodoListItemType[]) => Promise<void>;
  refreshTeamTodoList?: () => Promise<void>;
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
