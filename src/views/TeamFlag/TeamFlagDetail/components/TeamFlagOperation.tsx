import { Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Styled_TeamFlagOperation } from '../Styles';

/** 团队 flag 筛选 */
function TeamFlagOperation() {
  const navigate = useNavigate();

  return (
    <Styled_TeamFlagOperation>
      <div className="backIcon" onClick={() => navigate(-1)}>
        <RollbackOutlined />
      </div>
      <div className="title">Team Flag</div>
      <div className="operate">
        <Button type="primary">锁定</Button>
        <Button type="primary">编辑</Button>
      </div>
    </Styled_TeamFlagOperation>
  );
}

export default TeamFlagOperation;
