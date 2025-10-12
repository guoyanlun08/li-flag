import { Button, message } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiUpdateTeamFlagInfo } from '@/apis/teamFlag';
import { TeamFlagInfo } from '@/apis/teamFlag.type';
import { Styled_TeamFlagOperation } from '../Styles';
import { LockStatus, LOCK_BTN_CONFIG } from '../constants';

import TeamFlagDialog, { useTeamFlagDialog } from '@/components/TeamFlagDialog';

type PropsType = {
  /** 团队模块 Id */
  teamFlagId: number;
  /** 锁定状态 */
  lockStatus: LockStatus;
  /** 用户 Id */
  userId: string;
  /** 刷新团队 flag 信息 */
  refreshTeamFlagInfo: () => Promise<TeamFlagInfo>;
  /** 团队flag信息 */
  teamFlagInfo: Partial<TeamFlagInfo>;
};

/** 团队 flag 筛选 */
function TeamFlagOperation(props: PropsType) {
  const { lockStatus, teamFlagId, userId, refreshTeamFlagInfo, teamFlagInfo } = props;

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const lockBtnConfig = useMemo(() => {
    return LOCK_BTN_CONFIG[lockStatus] || LOCK_BTN_CONFIG[LockStatus.Unlocked];
  }, [lockStatus]);

  /** 编辑对话框 */
  const editDialog = useTeamFlagDialog({
    mode: 'edit',
    onFinishAdd: refreshTeamFlagInfo,
    initialData: teamFlagInfo as TeamFlagInfo
  });

  /** 点击锁定按钮 */
  const handleLockClick = async () => {
    if (lockStatus === LockStatus.OtherLocked) {
      return;
    }
    if (lockStatus === LockStatus.Unlocked) {
      // 当前未锁定，点击需转为自身锁定
      await apiUpdateTeamFlagInfo({ teamFlagId, locker: userId });
      messageApi.warning('已锁定');
      refreshTeamFlagInfo();
    } else if (lockStatus === LockStatus.SelfLocked) {
      // 当前自身锁定，点击需解锁
      await apiUpdateTeamFlagInfo({ teamFlagId, locker: '' });
      messageApi.success('已解锁');
      refreshTeamFlagInfo();
    }
  };

  /** 点击编辑按钮 */
  const handleEditClick = () => {
    if (lockStatus === LockStatus.OtherLocked) {
      messageApi.warning('当前Flag被他人锁定，无法编辑');
      return;
    }
    editDialog.show();
  };

  return (
    <>
      {contextHolder}
      <Styled_TeamFlagOperation>
        <div className="backIcon" onClick={() => navigate(-1)}>
          <RollbackOutlined />
        </div>
        <div className="title">{teamFlagInfo?.teamFlagTitle || 'Team Flag'}</div>
        <div className="operate">
          {/* 锁定按钮 */}
          <Button
            color={lockStatus === LockStatus.Unlocked ? 'primary' : 'danger'}
            variant="solid"
            disabled={lockBtnConfig.disabled}
            onClick={handleLockClick}>
            {lockBtnConfig.text(teamFlagInfo?.locker)}
          </Button>
          <Button color="primary" variant="solid" onClick={handleEditClick} disabled={lockStatus === LockStatus.OtherLocked}>
            编辑
          </Button>
        </div>
      </Styled_TeamFlagOperation>

      {/* 编辑对话框 */}
      <TeamFlagDialog
        open={editDialog.open}
        onHide={editDialog.hide}
        mode={editDialog.mode}
        onFinishAdd={editDialog.onFinishAdd}
        initialData={editDialog.initialData as TeamFlagInfo}
        form={editDialog.form}
      />
    </>
  );
}

export default TeamFlagOperation;
