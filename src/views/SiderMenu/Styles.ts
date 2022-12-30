
import styled from 'styled-components';
import mainColor from '@/styles/variables.module.scss'

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
    width: 50px;
    height: 50px;
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
    margin: 0 5px 0 0;
    border-left: 2px solid transparent;
    cursor: pointer;
    &:hover{
      border-left: 2px solid ${mainColor.activeTab};
      
    }
  }
`;
