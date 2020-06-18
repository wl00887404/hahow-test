import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import { AbilityNames } from '../types';

const Container = styled.div`
  display: flex;
  line-height: 1.5;
`;

const StyledButton = styled(Button)`
  width: 1.5em;
  height: 1.5em;
  padding: 0;
`;

const Name = styled.div`
  margin-right: 1.5em;
  width: 2em;
`;

const Value = styled.div`
  min-width: 2em;
  text-align: center;
`;

type Props = {
  name: AbilityNames;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  remainingValue: number;
};

const Ability = (props: Props) => {
  const { name, value, onIncrement, onDecrement, remainingValue } = props;

  return (
    <Container>
      <Name>{name}: </Name>
      <StyledButton onClick={onIncrement} disabled={remainingValue <= 0}>
        +
      </StyledButton>
      <Value>{value}</Value>
      <StyledButton onClick={onDecrement} disabled={value <= 0}>
        -
      </StyledButton>
    </Container>
  );
};

export default Ability;
