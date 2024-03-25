import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, FormProps } from 'antd';

import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { updateUserInfoThunk } from '@/features/user/userSlice';

import AvatarUpload from './AvatarUpload';
import { Styled_ModalBody, Styled_EditZone } from './Styles';

type PersonalSettingsProps = {
  visible: boolean;
  setOpen: (visible: boolean) => void;
};

type personalSettingsFieldType = {
  avatarPath: string;
  userId: string;
  nickName: string;
};

const PersonalSettingsModal = (props: PersonalSettingsProps) => {
  const { visible, setOpen } = props;

  const userState = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const { avatarPath, userId, nickName, lastOnlineTime } = userState;
  const [editStatus, setEditStatus] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      avatarPath,
      userId,
      nickName
    });
  });

  // 表单完成触发
  const onFinish: FormProps<personalSettingsFieldType>['onFinish'] = async (values) => {
    await dispatch(updateUserInfoThunk(values));

    setEditStatus(false);
  };

  return (
    <Modal
      title="个人中心"
      open={visible}
      okText="确认修改"
      cancelText="取消"
      width={700}
      styles={{ footer: { display: editStatus ? 'block' : 'none' } }}
      forceRender // modal中使用 useForm 需要加这个属性。modal 未渲染，antd 不知道 form 绑定在哪
      onOk={() => form.submit()}
      onCancel={() => setOpen(false)}>
      <Styled_ModalBody>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          form={form}
          name="personal-setting-form"
          onFinish={onFinish}
          style={{ width: 400, maxWidth: 800 }}>
          <Form.Item style={{ display: 'flex', justifyContent: 'center' }} name="avatarPath">
            <AvatarUpload />
          </Form.Item>
          <Styled_EditZone>
            <Button size="small" type="primary" onClick={() => setEditStatus(!editStatus)}>
              编 辑
            </Button>
          </Styled_EditZone>
          <Form.Item name="userId" label="userId">
            <Input disabled />
          </Form.Item>
          {/* 用小弹窗来呈现          
          <Form.Item name="password" label="密码">
            <Input disabled />
          </Form.Item>
          <Form.Item name="repeatPassword" label="确认密码">
            <Input disabled />
          </Form.Item> */}
          <Form.Item name="nickName" label="昵称" rules={[{ required: true }]}>
            {editStatus ? <Input spellCheck={false} /> : <div>{nickName}</div>}
          </Form.Item>
          <Form.Item label="上次登录时间">
            <div>{lastOnlineTime}</div>
          </Form.Item>
        </Form>
      </Styled_ModalBody>
    </Modal>
  );
};

export default PersonalSettingsModal;
