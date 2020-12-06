import { ExceptionCode } from './exception-code';

export default class InvalidStateException extends Error {
  constructor(readonly code: ExceptionCode) {
    super(code);
  }
}
