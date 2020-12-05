import { LoadingState, PlayerId, RegistrationId } from 'model/Types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import fetch, { fetchAction } from 'utils/fetch';

import { RootState } from 'store';

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

export const { changeLoadingState, changePlayerId } = registration.actions;

export const loadPlayerId = (id: RegistrationId) =>
  fetchAction(changeLoadingState, async (dispatch) => {
    const response = await fetch(`/api/player/register/${id}`).post();
    dispatch(changePlayerId(response.data));
  });

export const selectLoadingState = (state: RootState) => state.registration.loadingState;
export const selectPlayerId = (state: RootState) => state.registration.playerId;
