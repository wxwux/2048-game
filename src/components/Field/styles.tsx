import styled from 'styled-components';
import {
  calcFontSize, calculateBackgroundColor,
} from './helpers';

interface CellProps {
  x: number;
  y: number;
  value: number;
}

export const FieldTag = styled.div`
  height: 475px;
  position: relative;
  width: 475px;
`;

export const Background = styled.div`
  align-content: space-between;
  background-color: #bbada0;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 450px;
  justify-content: space-between;
  padding: 5px;
  position: absolute;
  width: 450px;
`;

export const Playground = styled(Background)`
  background-color: transparent;
`;

export const BackgroundCell = styled.div`
  margin: 5px;
  background-color: rgba(238, 228, 218, 0.35);
  height: 100px;
  width: 100px;
  border-radius: 5px;
`;

export const Cell = styled(BackgroundCell)<CellProps>`
  transform: translate(${(props) => props.y * 110}px, ${(props) => props.y * 110}px);
  text-align: center;
  line-height: 100px;
  background-color: ${({ value }) => calculateBackgroundColor(value)};
  position: absolute;
  transition-property: transform;
  transition: 100ms ease-in-out;
  color: #6a4e4e;
  font-weight: 900;
  font-size: ${(props) => `${calcFontSize(props.value)}px`}  
`;
