import React, { FC, useState } from 'react';
import { GameCell } from './types';
import { createStartCells } from './core/init';

import Layout from './components/Layout';
import Field from './components/Field';

const initCells : GameCell[] = createStartCells();

const App: FC = () => {
  const [cells, setCells] = useState<GameCell[]>(initCells);
  const [str, setSts] = useState();


  return (
    <Layout>
      <Field cells={cells} />
    </Layout>
  );
};

export default App;
