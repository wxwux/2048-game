import React, { FC } from 'react';
import { GameCell } from '../../types';

import {
  Container, Background, BackgroundCell, Playground, Cell, SplashContainer,
} from './styles';
import { MATRIX_SIZE } from '../../core/constants';

type PropTypes = {
  cells: GameCell[];
}

const Field : FC<PropTypes> = ({ cells, children }) => (
  <Container>
    <Background>
      {
        Array
          .from(new Array(MATRIX_SIZE ** 2), (_, i) => i)
          .map((i) => <BackgroundCell key={i} />)
      }
    </Background>

    <Playground>
      {cells.map(({
        x, y, value, id, state,
      }: GameCell) => (
        <Cell key={id} x={x} y={y} value={value} state={state}>
          {value}
        </Cell>
      ))}
    </Playground>
    <SplashContainer>
      {children}
    </SplashContainer>
  </Container>
);

export default Field;
