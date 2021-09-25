import { RootState } from '../../../store';

export const selectLoadingStatus = (state: RootState) => state.session.loadingStatus;
export const selectHasSession = (state: RootState) => state.session.hasSession;
export const selectShouldInputPin = (state: RootState) => state.session.shouldInputPin;
export const selectWasIncorrectPin = (state: RootState) => state.session.wasIncorrectPin;