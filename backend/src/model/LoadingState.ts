import { ExceptionCode } from './ExceptionCode';

export type LoadingState = 'INIT' | 'LOADING' | 'SUCCESS' | ['ERROR', ExceptionCode];
