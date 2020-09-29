import React, { FC } from 'react';
import { GameCell } from '../../types';
import SplashScreen from '../SplashScreen';

import {
  Container, Background, BackgroundCell, Playground, Cell, SplashContainer,
} from './styles';

type PropTypes = {
  cells: GameCell[];
}

const Field : FC<PropTypes> = ({ cells }: PropTypes) => (
  <Container>
    <Background>
      {
        Array
          .from(new Array(16), (_, i) => i)
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
      <SplashScreen />
    </SplashContainer>
  </Container>
);

export default Field;
