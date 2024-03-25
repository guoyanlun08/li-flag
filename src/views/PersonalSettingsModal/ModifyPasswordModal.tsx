import React from 'react';
import { Form, Modal, Input, FormProps } from 'antd';

type ModifyPasswordProps = {
  userId: string;
  visible: boolean;
  setOpen: (visible: boolean) => void;
};

type modifyPasswordFieldType = {
  password: string;
  repeatPassword: string;
};

const ModifyPasswordModal = (props: ModifyPasswordProps) => {
  const { userId, visible, setOpen } = props;

  const [form] = Form.useForm();

  const onFinish: FormProps<modifyPasswordFieldType>['onFinish'] = (values) => {
    console.log(values);
    console.log(userId);
    // 修改密码后台接口没写
  };

  return (
    <Modal title="修改密码" open={visible} onOk={() => form.submit()} onCancel={() => setOpen(false)} width={400}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        form={form}
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input.Password placeholder="input password" />
        </Form.Item>
        <Form.Item label="重复密码" name="repeatPassword" rules={[{ required: true, message: '请输入重复密码！' }]}>
          <Input.Password placeholder="input password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModifyPasswordModal;
