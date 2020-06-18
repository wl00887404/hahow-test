import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Ability from '../components/Ability';
import Button from '../components/Button';
import { Profile, AbilityNames } from '../types';

const Container = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 2em 0em;
  display: flex;
  justify-content: space-around;
  font-size: 1.5em;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2em 1em;
  }
`;

const AbilityContainer = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 1.5em;
  }
`;

const SaveButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  margin-top: 2em;

  & > *:not(:last-child) {
    margin-bottom: 1em;
  }

  width: 10em;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const HeroProfile = () => {
  const [profile, setProfile] = useState<Profile>();
  const [remainingValue, setRemainingValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { heroId } = useParams();
  const { loading: onSaveLoading, onSave } = useSaveProfile(profile, heroId);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,
      );

      setProfile(data);
      setRemainingValue(0);
      setLoading(false);
    };

    fetch();
  }, [heroId]);

  if (!profile || loading) return <div>Loading...</div>;

  const onIncrement = (name: AbilityNames) => () => {
    if (remainingValue === 0) return;

    const nextProfile = {
      ...profile,
      [name]: profile[name] + 1,
    };

    setProfile(nextProfile);
    setRemainingValue(remainingValue - 1);
  };

  const onDecrement = (name: AbilityNames) => () => {
    const nextValue = profile[name] - 1;

    if (nextValue < 0) return;

    const nextProfile = {
      ...profile,
      [name]: nextValue,
    };

    setProfile(nextProfile);
    setRemainingValue(remainingValue + 1);
  };

  return (
    <Container>
      <AbilityContainer>
        {Object.values(AbilityNames).map((name: AbilityNames) => (
          <Ability
            name={name}
            value={profile[name]}
            key={name}
            onIncrement={onIncrement(name)}
            onDecrement={onDecrement(name)}
            remainingValue={remainingValue}
          />
        ))}
      </AbilityContainer>
      <SaveButtonContainer>
        <div>剩餘點數： {remainingValue}</div>
        <Button
          block
          onClick={onSave}
          loading={onSaveLoading}
          disabled={remainingValue !== 0}
        >
          儲存
        </Button>
      </SaveButtonContainer>
    </Container>
  );
};

const useSaveProfile = (profile: Profile | undefined, heroId: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSave = async () => {
    if (!profile) return;

    setLoading(true);

    const { data } = await axios.patch(
      `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,
      profile,
    );

    alert(data === 'OK' ? '儲存成功' : '儲存失敗');
    setLoading(false);
  };

  return { loading, onSave };
};

export default HeroProfile;
