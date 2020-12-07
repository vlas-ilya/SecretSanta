import { PlayerId } from '../model/PlayerTypes';
import PlayerEntity from '../model/PlayerEntity';

export const setPlayersTarget = (players: PlayerEntity[]) => {
  const ids = players.map((player) => player.id);
  ids.sort(() => 0.5 - Math.random());

  while (existCoincidences(ids, players)) {
    ids.sort(() => 0.5 - Math.random());
  }

  players.forEach((player, index) => (player.targetId = ids[index]));
};

const existCoincidences = (ids: PlayerId[], players: PlayerEntity[]): boolean =>
  !!players.find((player, index) => player.id === ids[index]);
