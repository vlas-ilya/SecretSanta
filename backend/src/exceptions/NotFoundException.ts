import { ExceptionCode } from './ExceptionCode';

export default class NotFoundException extends Error {
  constructor(readonly code: ExceptionCode) {
    super();
  }
}
