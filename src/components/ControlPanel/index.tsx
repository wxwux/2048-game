import React, { FC, ReactNode, MouseEvent } from 'react';
import { Container, Controlls, Board } from './style';
import Button from '../Button';

type PropTypes = {
  children: ReactNode,
  onRunNewGame: () => void;
}

const ControlPanel: FC<PropTypes> = ({ children, onRunNewGame }: PropTypes) => (
  <Container>
    <Controlls>
      <Button onClick={onRunNewGame}>New Game</Button>
    </Controlls>
    <Board>
      {children}
    </Board>
  </Container>
);

export default ControlPanel;
