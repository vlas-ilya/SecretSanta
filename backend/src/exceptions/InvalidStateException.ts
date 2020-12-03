import { ExceptionCode } from './ExceptionCode';

export default class InvalidStateException extends Error {
  constructor(readonly code: ExceptionCode) {
    super();
  }
}
