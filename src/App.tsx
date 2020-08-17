import React, { FC, useState } from 'react';
import { GameCell } from './types';

import Layout from './components/Layout';
import Field from './components/Field';

const App: FC = () => {
  const [cells, setCells] = useState<GameCell[]>([{
    id: 1,
    x: 1,
    y: 1,
    value: 4,
  }]);

  return (
    <Layout>
      <Field cells={cells} />
    </Layout>
  );
};

export default App;
