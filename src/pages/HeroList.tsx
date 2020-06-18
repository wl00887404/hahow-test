import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import HeroCard from '../components/HeroCard';
import { Hero } from '../types';

const Container = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14em, 1fr));
  grid-gap: 1em;
  grid-auto-flow: dense;
`;

const HeroList = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const { heroId } = useParams();

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

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      {heroes.map(hero => (
        <HeroCard key={hero.id} {...hero} selected={hero.id === heroId} />
      ))}
    </Container>
  );
};

export default HeroList;
