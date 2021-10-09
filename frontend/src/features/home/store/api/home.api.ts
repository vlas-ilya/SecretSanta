import { GameId } from 'model';
import fetch from '../../../../utils/fetch';

export const create = async (): Promise<GameId> => {
  const response = await fetch(`/api/game/`).post();
  return response.data;
};
