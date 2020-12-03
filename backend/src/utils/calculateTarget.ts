import Player, { PlayerId } from '../features/player/player.entity';

export const calculateTarget = (players: Player[]) => {
  const ids = players.map((player) => player.id);
  ids.sort(() => 0.5 - Math.random());

  while (existCoincidences(ids, players)) {
    ids.sort(() => 0.5 - Math.random());
  }

  players.forEach((player, index) => (player.targetId = ids[index]));
};

const existCoincidences = (ids: PlayerId[], players: Player[]): boolean =>
  !!players.find((player, index) => player.id === ids[index]);
