import { RootState } from '../../../store';

export const selectLoadingStatus = (state: RootState) => state.session.loadingStatus;
export const selectHasSession = (state: RootState) => state.session.hasSession;