import { PlayerId } from '../model/PlayerTypes';
import PlayerDto from '../model/PlayerDto';

export const setPlayersTarget = (players: PlayerDto[]) => {
  const ids = players.map((player) => player.id);
  ids.sort(() => 0.5 - Math.random());

  while (existCoincidences(ids, players)) {
    ids.sort(() => 0.5 - Math.random());
  }

  players.forEach((player, index) => (player.targetId = ids[index]));
};

const existCoincidences = (ids: PlayerId[], players: PlayerDto[]): boolean =>
  !!players.find((player, index) => player.id === ids[index]);
