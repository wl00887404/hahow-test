import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import HeroCard from '../components/HeroCard/HeroCard';
import HeroCardSkeleton from '../components/HeroCard/HeroCardSkeleton';
import { Hero } from '../types';
import range from '../utils/range';

const Container = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14em, 1fr));
  grid-gap: 1em;
  grid-auto-flow: dense;
`;

type Props = {
  onSelect: (heroId: string) => void;
};

const HeroList = (props: Props) => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const { heroId } = useParams();
  const { onSelect } = props;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data } = await axios.get(
        'https://hahow-recruit.herokuapp.com/heroes',
      );

      setHeroes(data);
      setLoading(false);
    };

    fetch();
  }, []);

  if (loading) {
    return (
      <Container>
        {range(4).map(index => (
          <HeroCardSkeleton key={index} />
        ))}
      </Container>
    );
  }

  return (
    <Container>
      {heroes.map(hero => (
        <HeroCard
          key={hero.id}
          {...hero}
          selected={hero.id === heroId}
          onSelect={onSelect}
        />
      ))}
    </Container>
  );
};

export default HeroList;
