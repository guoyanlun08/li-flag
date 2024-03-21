import React, { useState } from 'react';
import { Modal } from 'antd';

const PersonalSettingsModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Modal title="个人中心" open={true} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={1000}>
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
};

export default PersonalSettingsModal;
