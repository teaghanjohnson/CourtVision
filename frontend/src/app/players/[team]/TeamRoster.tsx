export type RosterEntry = {
  nbaPlayerId: string;
  team: string;
  year: string;

  player: string;
  nickname: string | null;
  playerSlug: string;
  num: string;
  position: string;
  height: string;
  weight: number | null;
  birthDate: string | null;
  age: number;
  exp: string;
  school: string | null;
  howAcquired: string | null;
};
