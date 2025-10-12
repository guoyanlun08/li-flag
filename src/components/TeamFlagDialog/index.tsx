import React, { useState, useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import { ApiCreateTeamFlagReqData, TeamFlagInfo } from '@/apis/teamFlag.type';
import { Button, Modal, DatePicker, Form, Input, message, Space, FormInstance } from 'antd';
import UsersSearchSelect from '@/components/UsersSearchSelect';
import { apiUpdateTeamFlagInfo, apiCreateTeamFlag } from '@/apis/teamFlag';

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
  initialData?: TeamFlagInfo;
  form?: FormInstance;
}

export const useTeamFlagDialog = (
  props: {
    mode?: Mode | string;
    onFinishAdd?: () => void;
    initialData?: TeamFlagInfo | {};
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
    const { teamMembers } = (initialData || {}) as TeamFlagInfo;
    if (mode === Mode.edit && teamMembers) {
      const formData = {
        ...initialData,
        teamMembers: typeof teamMembers === 'string' ? teamMembers.split(',') : []
      };
      form.setFieldsValue(formData);
    }
  }, [mode, form, initialData]);

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
  const { open, onHide, mode = Mode.add, onFinishAdd, initialData, form: propsForm } = props;
  // 使用传入的表单实例或创建新实例
  const formInstance = propsForm || Form.useForm()[0];

  // 处理初始数据
  useEffect(() => {
    if (mode === Mode.edit && initialData) {
      const formData = {
        ...initialData,
        teamMembers:
          initialData.teamMembers && typeof initialData.teamMembers === 'string'
            ? initialData.teamMembers.split(',')
            : initialData.teamMembers || []
      };
      formInstance.setFieldsValue(formData);
    }
  }, [initialData, mode, formInstance, open]);

  const handleCancel = () => {
    formInstance.resetFields();
    onHide();
  };
  /* 新增表单请求 */
  const requestAdd = async (formData: ApiCreateTeamFlagReqData) => {
    console.log('formData', formData);
    console.log(dayjs(formData.teamDeadline).unix());
    try {
      const transferTeamMember = Array.isArray(formData.teamMembers) ? formData.teamMembers.join(',') : formData.teamMembers;
      const res = await apiCreateTeamFlag({
        ...formData,
        teamMembers: transferTeamMember,
        teamDeadline: formData.teamDeadline ? dayjs(formData.teamDeadline).valueOf() : null
      });
      if (!res.code) {
        message.success('创建成功');
        formInstance.resetFields();
        onHide();
        onFinishAdd?.();
      }
    } catch (err: any) {
      message.error(`失败: ${err.msg}`);
    }
  };
  const onFinish = async (formData: ApiCreateTeamFlagReqData) => {
    const transferTeamMember = Array.isArray(formData.teamMembers) ? formData.teamMembers.join(',') : formData.teamMembers || null;

    const submitData = {
      ...formData,
      teamMembers: transferTeamMember,
      teamDeadline: formData.teamDeadline ? dayjs(formData.teamDeadline).valueOf() : null
    };

    if (mode === Mode.add) {
      await requestAdd(formData);
    } else if (mode === Mode.edit && initialData && 'teamFlagId' in initialData) {
      try {
        const updateData = {
          teamFlagId: initialData.teamFlagId,
          teamFlagDesc: submitData.teamFlagDesc,
          teamDeadline: submitData.teamDeadline,
          teamLeader: submitData.teamLeader,
          teamMembers: submitData.teamMembers
        };

        const res = await apiUpdateTeamFlagInfo(updateData);
        if (res && res.updateTeamFlagId) {
          message.success('更新成功');
          formInstance.resetFields();
          onHide();
          onFinishAdd?.();
        }
      } catch (err: any) {
        message.error(`更新失败: ${err.msg || '未知错误'}`);
      }
    }
  };
  return (
    <>
      <Modal title="团队Flag" open={open} maskClosable={false} footer={false} onCancel={handleCancel}>
        <Form
          form={formInstance}
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
            <UsersSearchSelect />
          </Form.Item>
          <Form.Item label="成员" name="teamMembers">
            <UsersSearchSelect mode="multiple" />
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
