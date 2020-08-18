import React, { FC } from 'react';
import { GameCell } from '../../types';

import {
  FieldTag, Background, BackgroundCell, Playground, Cell,
} from './styles';

type PropTypes = {
  cells: GameCell[];
}

const Field : FC<PropTypes> = ({ cells }: PropTypes) => (
  <FieldTag>
    <Background>
      {
        Array
          .from(new Array(16), (_, i) => i)
          .map((i) => <BackgroundCell key={i} />)
      }
    </Background>

    <Playground>
      {cells.map(({
        x, y, value, id,
      }: GameCell) => (
        <Cell key={id} x={x} y={y} value={value}>
          {id}
        </Cell>
      ))}
    </Playground>
  </FieldTag>
);

export default Field;
