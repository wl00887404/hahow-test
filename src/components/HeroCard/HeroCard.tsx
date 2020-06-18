import React from 'react';
import styled, { css } from 'styled-components';

import Button from '../Button';

const SelectedStyle = css`
  background-color: rgb(255, 249, 225);
`;

type ContainerProps = { selected?: boolean };

export const Container = styled.div<ContainerProps>`
  text-align: center;
  padding: 1em;

  & > *:not(:last-child) {
    margin-bottom: 1em;
  }

  ${({ selected }) => selected && SelectedStyle};
`;

const Img = styled.img`
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 200px;
  border-radius: 3px;
`;

type Props = {
  id: string;
  name: string;
  image: string;
  selected: boolean;
  onSelect: (heroId: string) => void;
};

const HeroCard = (props: Props) => {
  const { id, name, image, selected, onSelect } = props;

  return (
    <Container selected={selected}>
      <Img src={image} />
      <div>{name}</div>
      <Button block onClick={() => onSelect(id)} disabled={selected}>
        選擇
      </Button>
    </Container>
  );
};

export default HeroCard;
