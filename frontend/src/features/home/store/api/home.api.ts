import { GameId } from 'model';
import fetch from '../../../../utils/fetch';

export const create = async (): Promise<GameId> => {
  const response = await fetch(`/api/game/create`).post();
  return response.data;
};
