import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type HistoryGame = {
  type: 'Game' | 'Player';
  gameName?: string;
  playerName?: string;
  playerCount?: number;
};

export type HistoryGames = {
  [key: string]: HistoryGame;
};

export function useHistoryGames() {
  const [value, setValue] = useLocalStorage('history_games', '{}');

  const list = useCallback(() => {
    return JSON.parse(value) as HistoryGames;
  }, [value]);

  const removeItem = useCallback(
    (key: string) => {
      const history = list();
      delete history[key];
      setValue(JSON.stringify(history));
    },
    [list, setValue],
  );

  const addItem = useCallback(
    (key: string, value: HistoryGame) => {
      const history = list();
      history[key] = value;
      setValue(JSON.stringify(history));
    },
    [list, setValue],
  );

  return {
    list,
    removeItem,
    addItem,
  };
}
