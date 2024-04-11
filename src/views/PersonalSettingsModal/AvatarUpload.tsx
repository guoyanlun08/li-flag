import React, { useEffect, useState } from 'react';
import { Upload, message } from 'antd';
import type { UploadProps, GetProp } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; // 临时用

import { authorizationHeader } from '@/utils/httpRequest';

import { Styled_AvatarContainer } from './Styles';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type PropsType = {
  avatarPath: string;
  disabled: boolean;
  onUploadAvatarFinish: (imgUrl: string) => void;
};

const AvatarUpload = (props: PropsType) => {
  const { avatarPath, disabled, onUploadAvatarFinish } = props;
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    setImageUrl(avatarPath);
  }, [avatarPath]);

  // 图片上传改变
  const handleChange: UploadProps['onChange'] = ({ file }) => {
    if (file.status === 'done') {
      const {
        response: { data }
      } = file;
      onUploadAvatarFinish(data.filePath);
      // XXX: 本地图片路径浏览器回显不出，看看有没有能屏蔽的
      setImageUrl(data.filePath);
    }
  };

  // 上传前校验
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <Styled_AvatarContainer>
      <Upload
        disabled={disabled}
        action={`${process.env.REACT_APP_BASE_URL}/upload/uploadAvatar`}
        headers={{
          ...authorizationHeader()
        }}
        listType="picture-circle"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        showUploadList={false}
        maxCount={1}>
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : UploadButton}
      </Upload>
    </Styled_AvatarContainer>
  );
};

const UploadButton = (
  <button style={{ border: 0, background: 'none' }} type="button">
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </button>
);

export default AvatarUpload;
