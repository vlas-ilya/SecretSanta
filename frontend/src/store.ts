import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import game from 'features/game/store/game.reducer';
import home from 'features/home/store/home.reducer';
import player from 'features/player/store/player.reducer';
import session from 'features/session/store/session.reducer';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  middleware: customizedMiddleware,
  reducer: {
    home,
    game,
    player,
    session,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
