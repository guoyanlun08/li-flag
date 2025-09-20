import { Button } from 'antd';
import { apiAddTeamFlagTodoItem } from '@/apis/todoItem';

type PropsType = {
  /** 团队模块 Id */
  teamFlagId: number;
  /** 刷新 todo 列表 */
  refreshTeamTodoList: () => Promise<void>;
};

/** 团队 flag 新增 todo 按钮 */
function AddTodoBtn(props: PropsType) {
  const { teamFlagId, refreshTeamTodoList } = props;

  /**
   *  点击新增
   */
  const handleClick = async () => {
    const resp = await apiAddTeamFlagTodoItem({ teamFlagId });
    if (resp.hadAdd) {
      refreshTeamTodoList();
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        新增 todo
      </Button>
    </div>
  );
}

export default AddTodoBtn;
