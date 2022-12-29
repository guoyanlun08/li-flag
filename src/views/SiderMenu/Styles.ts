/*
 * @Description: 
 * @Author: Huang.zq
 * @Date: 2022-12-29 21:28:09
 * @LastEditors: Huang.zq
 * @LastEditTime: 2022-12-29 23:28:05
 */
import styled from 'styled-components';

export const SiderMenuContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color:white;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  height: 50px;
  text-align: right;
  padding: 10px;
  font-size: 25px;
`;

export const MenuBox = styled.div`
  margin: 120px 0 0;
  flex: 1;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .info-avatar {
    width: 120px;
    height: 120px;
    border: 1px dashed red;
    border-radius: 50%;
  }
  .info-name {
    margin-top: 10px;
  }
`;
export const OptionsBar = styled.div`
  margin-top: 50px;
  text-align: center;
  > div {
    height: 50px;
    line-height: 50px;
    border: 1px solid black;
  }
`;
