import styled from 'styled-components';

// 个人中心弹窗 body 部分
export const Styled_ModalBody = styled.div`
  display: flex;
  justify-content: center;
`;

// 头像
export const Styled_AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  .ant-upload-wrapper {
    height: 100%;
    .ant-upload.ant-upload-select {
      width: 100%;
      height: 100%;
    }
  }
`;

export const Styled_EditZone = styled.div`
  display: flex;
  justify-content: right;
  margin-bottom: 10px;
`;
