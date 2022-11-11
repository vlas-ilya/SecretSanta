import {
  LoadableData,
  LoadableDataEvent,
  init,
  isLoading,
  success,
  updateLoadableData,
} from 'loadable-data';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Dispatch } from 'redux';

export type Data = any;

export type State = {
  data: LoadableData<Data>;
};

export const data = createSlice({
  name: 'data',
  initialState: {
    data: init(),
  } as State,
  reducers: {
    processData: (state: State, action: PayloadAction<LoadableDataEvent<Data>>) => {
      state.data = updateLoadableData(state.data, action.payload);
    },
  },
});

export const { processData } = data.actions;

export const loadData = () => async (dispatch: Dispatch) => {
  dispatch(processData(isLoading()));
  try {

    dispatch(processData(success(data)));
  } catch (e) {
    dispatch(processData(fail(e)));
  }
};

export default data.reducer;
