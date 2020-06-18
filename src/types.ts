export enum AbilityNames {
  'str' = 'str',
  'int' = 'int',
  'agi' = 'agi',
  'luk' = 'luk',
}

export type Hero = {
  id: string;
  name: string;
  image: string;
};

export type Profile = {
  str: number;
  int: number;
  agi: number;
  luk: number;
};
