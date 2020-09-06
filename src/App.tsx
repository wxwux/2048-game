import React, { FC, useState, useEffect } from 'react';
import { GameCell } from './types';
import { createStartCells } from './core/initer';
import { moveCells, Direction } from './core/engine';
import { removeAndIncreaseCells } from './core/updater';

import Layout from './components/Layout';
import Field from './components/Field';
import ControlPanel from './components/ControlPanel';
import Button from './components/Button';
import Score from './components/Score';

const initCells : GameCell[] = createStartCells();

const mappedKeysToDirections: {
  [key: string]: Direction
} = {
  ArrowUp: Direction.UP,
  ArrowRight: Direction.RIGHT,
  ArrowDown: Direction.DOWN,
  ArrowLeft: Direction.LEFT,
};

const App: FC = () => {
  const [cells, setCells] = useState<GameCell[]>(initCells);
  const [scores, setScores] = useState<number>(0);

  const runNewGame = (): void => {
    setCells(createStartCells());
    setScores(0);
  };

  const handleKeyPress = (event: KeyboardEvent): void => {
    if (Object.keys(mappedKeysToDirections).includes(event.code)) {
      // const [movedCells] = moveCells(cells, mappedKeysToDirections[event.code]);
      const movedCells = moveCells(cells, mappedKeysToDirections[event.code]);

      setCells(removeAndIncreaseCells(movedCells));
      // console.log(movedCells);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <Layout>
      <ControlPanel>
        <Button onClick={runNewGame}>New Game</Button>
        <Score>{scores}</Score>
      </ControlPanel>
      <Field cells={cells} />
    </Layout>
  );
};

export default App;
