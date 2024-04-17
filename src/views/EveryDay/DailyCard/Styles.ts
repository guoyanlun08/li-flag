import styled from 'styled-components';

// index
export const Styled_EveryDayContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

// 坐标系
export const Styled_CoordinateSystem = styled.div`
  .axis {
    position: absolute;
    background-color: rgb(178, 178, 178);
    .axis-arrow {
      position: absolute;
      width: 0;
      height: 0;
    }
    .axis-name {
      position: absolute;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .x-axis {
    width: 96%;
    height: 2px;
    top: 50%;
    left: 2%;
    .x-arrow {
      right: -4px;
      top: -15px;
      border-left: 15px solid rgb(178, 178, 178);
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
    }
    .x-name {
      right: -2%;
      top: -30px;
      color: #ffb000;
    }
  }
  .y-axis {
    width: 2px;
    height: 96%;
    top: 2%;
    left: 50%;
    .y-arrow {
      right: -15px;
      top: -4px;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 15px solid rgb(178, 178, 178);
    }
    .y-name {
      width: 40px;
      right: 15px;
      top: -2%;
      color: #ff4d4f;
    }
  }
`;

// EachModule
export const Styled_EachModuleContainer = styled.div<{ color?: string; index: number }>`
  background: ${(props) => props.color};
  margin-bottom: ${(props) => (props.index === 0 || props.index === 1 ? '1%' : '0px')};
  margin-right: ${(props) => (props.index === 0 || props.index === 2 ? '2%' : '0px')};
  width: 49%;
  height: 49%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

export const Styled_Title = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  padding: 10px 10px 0px;
  user-select: none;
  height: 40px;
  line-height: 25px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  .title-icon {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    border-radius: 50%;
    margin-right: 6px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: normal;
    display: flex;
    justify-content: center;
    background: ${(props) => props.color};
    color: #fff;
  }
`;

export const Styled_ListBox = styled.div`
  flex: 1;
  padding: 0 15px 80px 0;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
