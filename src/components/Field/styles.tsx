import styled from 'styled-components';
import {
  calcFontSize, calculateBackgroundColor,
} from './helpers';
import { CellType } from '../../types';
import { MATRIX_SIZE } from '../../core/constants';

interface CellProps {
  x: number;
  y: number;
  value: number;
  state: CellType;
}

export const calcPlaygroundSize = (
  cellSize: number, marginSize: number,
): number => cellSize * MATRIX_SIZE + marginSize * 2 * MATRIX_SIZE + 10;

export const Container = styled.div`
  height:  ${calcPlaygroundSize(100, 5)}px;
  width: ${calcPlaygroundSize(100, 5)}px;
  position: relative;
`;

export const SplashContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

export const Background = styled.div`
  align-content: space-between;
  background-color: #bbada0;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5px;
  position: absolute;
  width: 100%;
  height: 100%;
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
