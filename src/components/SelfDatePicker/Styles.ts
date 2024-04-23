import styled from 'styled-components';

// 弹窗的宽度
export const DATE_PICKER_POP_WIDTH = 220;
export const DATE_PICKER_POP_HEIGHT = 180;

export const Styled_SelfDatePicker = styled.div`
  .date-picker-title {
    width: 60px;
    font-size: 12px;
  }
`;

export const Styled_SelfDatePickerPop = styled.div<{ coordinate: { x: number; y: number } }>`
  position: fixed;
  left: ${(props) => `${props.coordinate.x}px`};
  top: ${(props) => `${props.coordinate.y}px`};
  z-index: 1000;
  background: #fff;
  width: ${DATE_PICKER_POP_WIDTH}px;
  height: ${DATE_PICKER_POP_HEIGHT}px;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  .date-pop-tab {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
  .date-pop-content {
    width: 220px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .date-pop-item {
      width: 180px;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
      .date-pop-antd-date {
        width: 120px;
      }
    }
  }
  .date-pop-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
  }
`;
