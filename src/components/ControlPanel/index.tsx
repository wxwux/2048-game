import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

type PropTypes = {
  children: ReactNode
}

const ControllPanel: FC<PropTypes> = ({ children }: PropTypes) => <Container>{children}</Container>;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
  width: 100%;
  align-items: center;
`;

export default ControllPanel;
