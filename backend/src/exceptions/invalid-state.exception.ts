import { ExceptionCode } from '../model/ExceptionCode';

export default class InvalidStateException extends Error {
  constructor(readonly code: ExceptionCode) {
    super(code);
  }
}
