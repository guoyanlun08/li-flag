import React, { useState } from 'react';
import { Modal, Upload } from 'antd';
import type { UploadFile } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; // 临时用

import { Styled_ModalBody } from './Styles';

const PersonalSettingsModal = () => {
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ]);
  return (
    <Modal className="wowoowowo" title="个人中心" open={true} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={1000}>
      <Styled_ModalBody>
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
      </Styled_ModalBody>
    </Modal>
  );
};

export default PersonalSettingsModal;
