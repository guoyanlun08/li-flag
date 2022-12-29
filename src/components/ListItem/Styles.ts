import styled from 'styled-components';

export const Item = styled.div<{ selected: boolean }>`
  background: ${ props => props.selected ? 'rgba(255, 255, 255, 0.2)' : '' };
  display: flex;
  align-items: center;
  height: 35px;
  padding-left: 20px;
  .ant-checkbox {
    top: 0;
  }
`
export const ItemContent = styled.div<{ selected: boolean, completed: boolean }>`
  border-bottom: ${ props => props.selected ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.2)' } ;
  padding-left: 8px;
  width: 100%;
  height: 100%;
  input{
    text-decoration: ${ props => props.completed ? 'line-through' : 'none' };
    color: ${ props => props.completed ? 'rgba(255, 255, 255, 0.4)' : '#000' };
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
  }
`