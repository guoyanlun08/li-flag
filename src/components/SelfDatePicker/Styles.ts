import styled from 'styled-components';
import mainColor from '@/styles/variables.module.scss';

export const Styled_SelfDatePicker = styled.div`
  border: 1px solid black;
  position: relative;
  font-size: 12px;
  width: 250px;
  .date-tab {
    display: flex;
    .date-tab-box {
      flex: 1;
      display: flex;
      justify-content: center;
      div {
        padding: 4px;
        color: ${mainColor.mainGray};
      }
    }
  }
  .ant-picker.ant-picker-outlined {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
  }
`;
