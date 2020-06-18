import React from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import Button from './Button';

const SelectedStyle = css`
  background-color: rgb(255, 249, 225);
`;

type ContainerProps = { selected: boolean };

const Container = styled.div<ContainerProps>`
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
  background-color: #eee;
`;

type Props = {
  id: string;
  name: string;
  image: string;
  selected: boolean;
};

const HeroCard = (props: Props) => {
  const { id, name, image, selected } = props;
  const history = useHistory();

  return (
    <Container selected={selected}>
      <Img src={image} />
      <div>{name}</div>
      <Button
        block
        onClick={() => history.push(`/heroes/${id}`)}
        disabled={selected}
      >
        選擇
      </Button>
    </Container>
  );
};

export default HeroCard;
