import styled from 'styled-components';
import mainColor from '@/styles/variables.module.scss';

export const Styled_SelfDatePicker = styled.div<{ isDate: boolean }>`
  background: #fff;
  position: relative;
  font-size: 12px;
  width: 288px;
  height: 30px;
  .date-tab {
    display: flex;
    background: rgba(25, 25, 25, 0.05);
    padding: 2px 4px;
    box-sizing: border-box;
    .date-tab-box {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      &:hover {
        .date-tab-text {
          color: ${mainColor.mainBlue};
        }
      }
      .date-tab-text {
        padding: 6px;
        color: ${mainColor.mainGray};
      }
    }
    .date-tab-active {
      background: #fff;
      .date-tab-text {
        color: ${mainColor.mainBlue};
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
