import React, { FC, useState, useEffect } from 'react';
import { GameCell, Direction, Matrix } from './types';
import { createInitialCells, populateFieldWithNewCells } from './core/creator';
import { getNewCellsPosition } from './core/engine';
import { removeAndIncreaseCells } from './core/updater';

import Layout from './components/Layout';
import Field from './components/Field';
import ControlPanel from './components/ControlPanel';
import Button from './components/Button';
import Scoreboard from './components/Scoreboard';
import { matrixAreSame } from './core/matrix';

const initCells : GameCell[] = createInitialCells();

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
    setCells(createInitialCells());
    setScores(0);
  };

  const updateFieldByDirection = (direction: Direction) => {
    const movedCells = getNewCellsPosition(cells, direction);
    const [cleanedAndIncreasedCells, gainedScores] = removeAndIncreaseCells(movedCells);
    let resultCells: GameCell[] = cleanedAndIncreasedCells;

    if (!matrixAreSame(cells, cleanedAndIncreasedCells)) {
      resultCells = populateFieldWithNewCells(cleanedAndIncreasedCells);
    }

    setCells(resultCells);
    setScores(gainedScores);
  };

  const handleKeyPress = (event: KeyboardEvent): void => {
    if (Object.keys(mappedKeysToDirections).includes(event.code)) {
      updateFieldByDirection(mappedKeysToDirections[event.code]);
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
        <Scoreboard gainedScores={scores} />
      </ControlPanel>
      <Field cells={cells} />
    </Layout>
  );
};

export default App;
