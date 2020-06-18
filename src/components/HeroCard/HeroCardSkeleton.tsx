import React from 'react';
import styled from 'styled-components';

import Button from '../Button';
import { Container } from './HeroCard';
import Placeholder from '../Placeholder';

const ImgPlaceholder = styled(Placeholder)`
  margin: 0 auto;
  width: 200px;
  height: 200px;
`;

const NamePlaceholder = styled(Placeholder)`
  margin: 0 auto;
  width: 160px;
`;

const HeroCardSkeleton = () => (
  <Container>
    <ImgPlaceholder />
    <NamePlaceholder>skeleton</NamePlaceholder>
    <Button block skeleton>
      選擇
    </Button>
  </Container>
);

export default HeroCardSkeleton;
