import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Space, FormProps } from 'antd';

import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { updateUserInfoThunk } from '@/features/user/userSlice';

import AvatarUpload from './AvatarUpload';
import ModifyPasswordModal from './ModifyPasswordModal';
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
  const [passwordVisible, setPasswordVisible] = useState(false);
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

  // 上传头像后，表单赋值
  const setFormAvatarPath = (imgUrl: string) => {
    form.setFieldValue('avatarPath', imgUrl);
  };

  return (
    <>
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
              <AvatarUpload avatarPath={avatarPath || ''} disabled={!editStatus} onUploadAvatarFinish={setFormAvatarPath} />
            </Form.Item>
            <Styled_EditZone>
              <Space>
                <Button size="small" onClick={() => setPasswordVisible(true)}>
                  修改密码
                </Button>
                <Button size="small" type="primary" onClick={() => setEditStatus(!editStatus)}>
                  编 辑
                </Button>
              </Space>
            </Styled_EditZone>
            <Form.Item name="userId" label="userId">
              <Input disabled />
            </Form.Item>
            <Form.Item name="nickName" label="昵称" rules={[{ required: true }]}>
              {editStatus ? <Input spellCheck={false} /> : <div>{nickName}</div>}
            </Form.Item>
            <Form.Item label="上次登录时间">
              <div>{lastOnlineTime}</div>
            </Form.Item>
          </Form>
        </Styled_ModalBody>
      </Modal>
      <ModifyPasswordModal userId={userId} visible={passwordVisible} setOpen={(val) => setPasswordVisible(val)} />
    </>
  );
};

export default PersonalSettingsModal;
