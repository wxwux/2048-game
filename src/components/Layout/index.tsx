import React, { FC, ReactNode } from 'react';
import { Main, Content } from './style';

type PropTypes = {
  children: ReactNode;
}

const Layout: FC<PropTypes> = ({ children }: PropTypes) => (
  <Main>
    <Content>{children}</Content>
  </Main>
);

export default Layout;
