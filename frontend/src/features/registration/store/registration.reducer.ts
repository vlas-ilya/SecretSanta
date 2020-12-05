import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';

import { GameId, LoadingState, PlayerId, RegistrationId } from '../../../model/Types';
import fetch, { fetchAction } from '../../../utils/fetch';
import { changeGame } from '../../game/store/game.reducer';

export interface State {
  loadingState: LoadingState;
  playerId?: PlayerId;
}

export const initialState: State = {
  loadingState: 'INIT',
};

export const registration = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    changeLoadingState: (state: State, action: PayloadAction<LoadingState>) => {
      state.loadingState = action.payload;
    },
    changePlayerId: (state: State, action: PayloadAction<PlayerId>) => {
      state.playerId = action.payload;
    },
  },
});

export default registration.reducer;

export const {
  changeLoadingState,
  changePlayerId,
} = registration.actions;

const action = fetchAction(
  () => changeLoadingState('LOADING'),
  () => changeLoadingState('SUCCESS'),
  () => changeLoadingState('ERROR'),
);

export const loadPlayerId = (id: RegistrationId) =>
  action(async (dispatch) => {
    const response = await fetch(`/api/player/register/${id}`).post();
    dispatch(changePlayerId(response.data));
  });


const selectSelf = ({ registration }: { registration: State }) => registration;

export const selectLoadingState = createSelector(selectSelf, state => state.loadingState);
export const selectPlayerId = createSelector(selectSelf, state => state.playerId);

