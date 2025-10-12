import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

import { Card, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Styled_TeamFlagOutlet } from '../Styles';
import CardHeader from './components/CardHeader';
import CardFooter from './components/CardFooter';
import TeamFalagDialog from '@/components/TeamFlagDialog';
import { useTeamFlagDialog } from '@/components/TeamFlagDialog';
import { TeamFlagInfo } from '@/apis/teamFlag.type';
import { apiGetTeamFlagInfoByUser, apiDeleteTeamFlag } from '@/apis/teamFlag';

function TeamFlagCard() {
  const [teamFlagsData, setTeamFlagsData] = useState<TeamFlagInfo[]>([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCardaClick = (teamFlagId: number) => {
    navigate(`${pathname}/${teamFlagId}`);
  };
  const handleCardDelete = async (teamFlagId: number, e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>) => {
    e.stopPropagation && e.stopPropagation();
    try {
      const res = await apiDeleteTeamFlag({ teamFlagId });
      if (!res.code) {
        message.success('删除成功');
        getTeamFlags(); // 刷新列表
      } else {
        message.error(`删除失败: ${res.msg}`);
      }
    } catch (err: any) {
      message.error(`删除失败: ${err.msg}`);
    }
  };

  const showModal = () => {
    tfd.show();
  };

  const getTeamFlags = async () => {
    try {
      const res = await apiGetTeamFlagInfoByUser();
      setTeamFlagsData(res);
    } catch (err: any) {
      message.error(`获取失败: ${err.msg}`);
    }
  };

  const tfd = useTeamFlagDialog({
    mode: 'add',
    onFinishAdd: () => {
      getTeamFlags();
    }
  });

  useEffect(() => {
    // 获取团队flag数据
    getTeamFlags();
  }, []);
  return (
    <Styled_TeamFlagOutlet>
      <div className="nav-header">
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          新增
        </Button>
      </div>
      <div className="team-Flag-content">
        {teamFlagsData.map((item) => {
          return (
            <Card
              onClick={() => handleCardaClick(item.teamFlagId)}
              key={item.teamFlagId}
              hoverable
              title={
                <CardHeader
                  id={item.teamFlagId}
                  groupIcon={item.teamFlagIcon}
                  title={item.teamFlagTitle}
                  description={item.teamFlagDesc}
                  deadline={item.teamDeadline ? dayjs(item.teamDeadline).format('YYYY-MM-DD') : null}
                  handleCardDelete={handleCardDelete}
                />
              }
              headStyle={{ borderBottom: 'none' }}
              bodyStyle={{ padding: '24px 24px' }}
              style={{ width: '60%', margin: 10 }}>
              <CardFooter finished={item.completedCount} total={item.todoItemCount} memberAvatar={[]} />
            </Card>
          );
        })}
      </div>

      <TeamFalagDialog open={tfd.open} onHide={tfd.hide} mode={tfd.mode} onFinishAdd={tfd.onFinishAdd}></TeamFalagDialog>
    </Styled_TeamFlagOutlet>
  );
}
export default TeamFlagCard;
