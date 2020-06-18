import React from 'react';
import { Container, Name, Value, StyledButton } from './Ability';
import { withPlaceholderStyle } from '../Placeholder';

const NamePlaceHolder = withPlaceholderStyle(Name);
const ValuePlaceHolder = withPlaceholderStyle(Value);

const AbilitySkeleton = () => (
  <Container>
    <NamePlaceHolder />
    <StyledButton skeleton>+</StyledButton>
    <ValuePlaceHolder />
    <StyledButton skeleton>-</StyledButton>
  </Container>
);

export default AbilitySkeleton;
