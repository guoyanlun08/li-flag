import styled from 'styled-components';

// index
export const EveryDayContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

// EachModule
export const EachModuleContainer = styled.div<{ bgColor: string }>`
  background: ${(props) => props.bgColor};
  width: 50%;
  height: 50%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  padding: 10px;
`;

export const ListBox = styled.div`
  flex: 1;
  padding: 0 15px;
`;
