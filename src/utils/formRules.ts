import { Rule } from 'antd/lib/form';

export const passwordRules = [
  { required: true, message: '请输入密码！' },
  { min: 6, max: 18, message: '密码长度应在 6 到 18 个字符之间！' }
];

export const confirmPasswordRules = [
  { required: true, message: '请输入确认密码' },
  ({ getFieldValue }: { getFieldValue: (name: string) => string | undefined }) => ({
    validator(_: Rule, value: string) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('两次输入的密码不一致！'));
    }
  })
];
