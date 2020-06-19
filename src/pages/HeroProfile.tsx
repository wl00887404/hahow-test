import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Ability from '../components/Ability/Ability';
import AbilitySkeleton from '../components/Ability/AbilitySkeleton';
import Button from '../components/Button';
import { Profile, AbilityNames } from '../types';
import Placeholder from '../components/Placeholder';
import { alert } from '../components/Alert';

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
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
  const [loading, setLoading] = useState<boolean>(false);
  const { heroId } = useParams();
  const {
    profile,
    setProfile,
    remainingValue,
    setRemainingValue,
    onIncrement,
    onDecrement,
  } = useProfile();
  const {
    loading: onSaveLoading,
    onSave,
    isSaveable,
    setOriginProfile,
  } = useSaveProfile(heroId, profile, remainingValue);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,
      );

      setProfile(data);
      setOriginProfile(data);
      setRemainingValue(0);
      setLoading(false);
    };

    fetch();
  }, [heroId, setOriginProfile, setProfile, setRemainingValue]);

  if (!profile || loading)
    return (
      <>
        <AbilityContainer>
          {Object.values(AbilityNames).map(name => (
            <AbilitySkeleton key={name} />
          ))}
        </AbilityContainer>
        <SaveButtonContainer>
          <Placeholder>剩餘點數： {remainingValue}</Placeholder>
          <Button block skeleton>
            儲存
          </Button>
        </SaveButtonContainer>
      </>
    );

  return (
    <>
      <AbilityContainer>
        {Object.values(AbilityNames).map(name => (
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
          disabled={!isSaveable}
        >
          儲存
        </Button>
      </SaveButtonContainer>
    </>
  );
};

const useProfile = () => {
  const [profile, setProfile] = useState<Profile>();
  const [remainingValue, setRemainingValue] = useState<number>(0);

  const onIncrement = (name: AbilityNames) => () => {
    if (!profile || remainingValue === 0) return;

    const nextProfile = {
      ...profile,
      [name]: profile[name] + 1,
    };

    setProfile(nextProfile);
    setRemainingValue(remainingValue - 1);
  };

  const onDecrement = (name: AbilityNames) => () => {
    if (!profile) return;

    const nextValue = profile[name] - 1;

    if (nextValue < 0) return;

    const nextProfile = {
      ...profile,
      [name]: nextValue,
    };

    setProfile(nextProfile);
    setRemainingValue(remainingValue + 1);
  };

  return {
    profile,
    setProfile,
    remainingValue,
    setRemainingValue,
    onIncrement,
    onDecrement,
  };
};

const useSaveProfile = (
  heroId: string,
  profile: Profile | undefined,
  remainingValue: number,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const originProfileRef = useRef<Profile>();

  const isSaveable = useMemo(() => {
    const originProfile = originProfileRef.current;
    if (!originProfile || !profile) return false;

    const isEqual = Object.values(AbilityNames).every(
      name => originProfile[name] === profile[name],
    );

    return !isEqual && remainingValue === 0;
  }, [profile, remainingValue]);

  const setOriginProfile = useCallback((nextOriginProfile: Profile) => {
    originProfileRef.current = nextOriginProfile;
  }, []);

  const onSave = async () => {
    if (loading || !profile) return;

    setLoading(true);

    const { data } = await axios.patch(
      `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,
      profile,
    );

    if (data === 'OK') {
      alert.success('儲存成功');
    } else {
      alert.fail('儲存失敗');
    }

    setLoading(false);
    setOriginProfile(profile);
  };

  return { loading, onSave, isSaveable, setOriginProfile };
};

type Props = {
  autoFocus: boolean;
};

const withContainer = (Component: React.FunctionComponent) => (
  props: Props,
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { autoFocus } = props;
  const { heroId } = useParams();

  useEffect(() => {
    if (!autoFocus || !ref.current) return;

    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });
  }, [heroId, autoFocus]);

  return (
    <Container ref={ref}>
      <Component />
    </Container>
  );
};

export default withContainer(HeroProfile);
