import React, { useState, useCallback, useEffect } from 'react';
import { ApiCreateTeamFlagReqData } from '@/apis/teamFlag.type';
import { Button, Modal, DatePicker, Form, Input, message, Space } from 'antd';
import RemoteSearchSelect from '@/components/RemoteSearchSelect';
import { apiUpdateTeamFlagInfo, apiCreateTeamFlag } from '@/apis/teamFlag';
import { searchUsers } from '@/apis/user';
const { TextArea } = Input;
enum Mode {
  add = 'add',
  edit = 'edit'
}
interface TeamFalagDialogProps {
  open: boolean;
  onHide: () => void;
  mode?: Mode | string;
  onFinishAdd?: () => void;
  initialData?: ApiCreateTeamFlagReqData;
}
interface usersInfo {
  avatarPath?: string;
  nickName: string;
  userId: string;
}
/* 远程搜索用户 */
const searchUserRequest = async (search: string) => {
  try {
    const res = (await searchUsers({ userId: search })) as usersInfo[];
    return res.map((user) => ({
      label: user.nickName,
      value: user.userId
    }));
  } catch (error) {
    message.error('搜索用户失败');
    return [];
  }
};

export const useTeamFlagDialog = (
  props: {
    mode?: Mode | string;
    onFinishAdd?: () => void;
    initialData?: ApiCreateTeamFlagReqData;
  } = {}
) => {
  const { mode = Mode.add, onFinishAdd, initialData } = props;
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const show = useCallback(() => {
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    form.resetFields();
    setOpen(false);
  }, [form]);

  useEffect(() => {
    if (mode === Mode.edit && initialData) {
      const formData = {
        ...initialData,
        teamMembers: typeof initialData.teamMembers === 'string' ? initialData.teamMembers.split(',') : initialData.teamMembers || []
      };
      form.setFieldsValue(formData);
    }
  }, [mode, form, props.initialData]);

  return {
    open,
    show,
    hide,
    form,
    mode,
    onFinishAdd,
    initialData
  };
};

function TeamFalagDialog(props: TeamFalagDialogProps) {
  const { open, onHide, mode = Mode.add, onFinishAdd, initialData } = props;
  const [addForm] = Form.useForm();

  // 处理初始数据
  useEffect(() => {
    if (mode === Mode.edit && initialData) {
      const formData = {
        ...initialData,
        teamMembers: typeof initialData.teamMembers === 'string' ? initialData.teamMembers.split(',') : initialData.teamMembers || []
      };
      addForm.setFieldsValue(formData);
    }
  }, [initialData, mode, addForm]);

  const handleCancel = () => {
    addForm.resetFields();
    onHide();
  };
  /* 新增表单请求 */
  const requestAdd = async (formData: ApiCreateTeamFlagReqData) => {
    try {
      const transferTeamMember = Array.isArray(formData.teamMembers) ? formData.teamMembers.join(',') : formData.teamMembers;
      const res = await apiCreateTeamFlag({ ...formData, teamMembers: transferTeamMember });
      if (!res.code) {
        message.success('创建成功');
        addForm.resetFields();
        onHide();
        onFinishAdd?.();
      }
    } catch (err: any) {
      message.error(`失败: ${err.msg}`);
    }
  };
  const onFinish = async (formData: ApiCreateTeamFlagReqData) => {
    const transferTeamMember = Array.isArray(formData.teamMembers) ? formData.teamMembers.join(',') : formData.teamMembers;

    const submitData = {
      ...formData,
      teamMembers: transferTeamMember
    };
    if (mode === Mode.add) {
      await requestAdd(formData);
    }
  };
  return (
    <>
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
            <Input disabled={mode === Mode.edit} />
          </Form.Item>
          <Form.Item label="描述" name="teamFlagDesc">
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item label="截止时间" name="teamDeadline" style={{ width: '100%' }}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Leader" name="teamLeader">
            <RemoteSearchSelect fetchOptions={searchUserRequest} />
          </Form.Item>
          <Form.Item label="成员" name="teamMembers">
            <RemoteSearchSelect mode="multiple" fetchOptions={searchUserRequest} />
          </Form.Item>

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
    </>
  );
}
export default TeamFalagDialog;
