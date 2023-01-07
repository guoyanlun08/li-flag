import styled from 'styled-components';
import mainColor from '@/styles/variables.module.scss';

export const SiderMenuContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-direction: column;
  .side-footer {
    width: 100%;
    height: 50px;
    padding: 10px 0;
    color: #bfbcbca8;
    text-align: center;
    font-size: 25px;
  }
`;

export const Header = styled.div<{ fold: boolean }>`
  height: 54px;
  text-align: center;
  padding: 10px;
  font-size: 25px;
  display: ${(props) => (props.fold ? 'block' : 'none')};
`;

export const MenuBox = styled.div`
  margin: 10px 0 0;
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Info = styled.div<{ fold: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3 ease-in-out;
  .info-avatar {
    width: ${(props) => (props.fold ? '100px' : '50px')};
    height: ${(props) => (props.fold ? '100px' : '50px')};
    border: 1px dashed red;
    border-radius: 50%;
    transition-property: width height;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info-name {
    margin-top: 10px;
    color: ${mainColor.mainGray};
    display: ${(props) => (props.fold ? 'block' : 'none')};
  }
`;

export const OptionsBar = styled.div`
  margin-top: 10px;
  text-align: center;
  > div {
    height: 50px;
    line-height: 50px;
    margin: 0 5px 0 0;
    border-left: 2px solid transparent;
    cursor: pointer;
    &:hover {
      border-left: 2px solid ${mainColor.activeTab};
      color: ${mainColor.activeTab};
      font-weight: bold;
    }
  }
`;
