import styled, { css, keyframes } from 'styled-components';
import {
  calcFontSize, calculateBackgroundColor,
} from './helpers';
import { CellType } from '../../types';

interface CellProps {
  x: number;
  y: number;
  value: number;
  state: CellType;
}

export const FieldTag = styled.div`
  height: 450px;
  width: 450px;
  position: relative;
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

export const calcTranslate = (x: number, y: number): string => `
  translate(${x * 110}px, ${y * 110}px)
`;

export const Cell = styled(BackgroundCell)<CellProps>`
  // transform: ${(props) => calcTranslate(props.x, props.y)};
  left: ${(props) => props.x * 110 + 5}px;
  top: ${(props) => props.y * 110 + 5}px;
  text-align: center;
  line-height: 100px;
  background-color: ${({ value }) => calculateBackgroundColor(value)};
  position: absolute;
  transition: .1s;
  color: #6a4e4e;
  font-weight: 900;
  font-size: ${(props) => `${calcFontSize(props.value)}px`};
  will-change: transform;
    
  ${({ state }) => state === CellType.BORN && `
    animation: zoom .1s;
  `}  
  
  @keyframes zoom {
    from { transform: scale(.5); }
    to { transform: scale(1); }
  }
`;
