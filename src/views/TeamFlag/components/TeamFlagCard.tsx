import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Card, Button, Modal, DatePicker, Form, Input, message, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Styled_TeamFlagOutlet } from '../Styles';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import { TeamFlagItem, CreateTeamFlagReqData } from '@/features/teamFlag/type';
import { getTeamFlagInfoByUser, createTeamFlag, deleteTeamFlag } from '@/apis/teamFlag';

const { TextArea } = Input;
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function TeamFlagCard() {
  const [teamFlagsData, setTeamFlagsData] = useState<TeamFlagItem[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [addForm] = Form.useForm();

  const handleCardaClick = (teamFlagId: number) => {
    navigate(`${pathname}/${teamFlagId}`);
  };
  const handleCardDelete = async (teamFlagId: number, e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>) => {
    e.stopPropagation && e.stopPropagation();
    try {
      const res = await deleteTeamFlag({ teamFlagId });
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
  const onFinish = async (formData: CreateTeamFlagReqData) => {
    try {
      const res = await createTeamFlag({ ...formData });
      if (!res.code) {
        message.success('创建成功');
        addForm.resetFields();
        setOpen(false);
        getTeamFlags();
      }
    } catch (err: any) {
      message.error(`失败: ${err.msg}`);
    }
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    addForm.resetFields();
    setOpen(false);
  };
  const getTeamFlags = async () => {
    try {
      const res = await getTeamFlagInfoByUser();
      setTeamFlagsData(res);
    } catch (err: any) {
      message.error(`获取失败: ${err.msg}`);
    }
  };
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
                  deadline={item.teamDeadline}
                  handleCardDelete={handleCardDelete}
                />
              }
              headStyle={{ borderBottom: 'none' }}
              bodyStyle={{ padding: '10px 24px' }}
              style={{ width: '60%', margin: 10 }}>
              <CardFooter finished={0} total={0} memberAvatar={[]} />
            </Card>
          );
        })}
      </div>
      <Modal title="团队Flag" open={open} maskClosable={false} footer={false} onCancel={handleCancel}>
        <Form
          form={addForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          autoComplete="off"
          onFinish={onFinish}>
          <Form.Item label="标题" name="teamFlagTitle" rules={[{ required: true, message: '请输入标题' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="teamFlagDesc">
            <TextArea rows={2} />
          </Form.Item>
          {/* <Form.Item label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item> */}

          <Form.Item label="Deadline" name="teamDeadline" rules={[{ required: true, message: '请输入截止时间!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Leader" name="teamLeader">
            <Input />
          </Form.Item>
          <Form.Item label="成员" name="teamMembers">
            <Input />
          </Form.Item>

          {/* <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item> */}
          <Form.Item wrapperCol={{ offset: 4, span: 14 }} style={{ marginTop: 24 }}>
            <Space>
              <Button type="primary" htmlType="submit" className="saveAdd">
                保存
              </Button>
              <Button type="default" htmlType="button" onClick={handleCancel}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Styled_TeamFlagOutlet>
  );
}
export default TeamFlagCard;
