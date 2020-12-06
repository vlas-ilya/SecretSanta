import { ExceptionCode } from './exception-code';
import { UnauthorizedException } from '@nestjs/common';

export default class IncorrectPasswordException extends UnauthorizedException {
  constructor(readonly code: ExceptionCode) {
    super(code);
  }
}
