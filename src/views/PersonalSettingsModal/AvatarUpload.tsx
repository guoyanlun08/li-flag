import React, { useState } from 'react';
import { Upload } from 'antd';
import type { UploadFile } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; // 临时用

import { Styled_AvatarContainer } from './Styles';

const AvatarUpload = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ]);
  return (
    <Styled_AvatarContainer>
      <Upload
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        // onPreview={handlePreview}
        // onChange={handleChange}
        showUploadList={false}
        maxCount={1}>
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      </Upload>
    </Styled_AvatarContainer>
  );
};

export default AvatarUpload;
