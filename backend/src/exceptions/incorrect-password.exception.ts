import { ExceptionCode } from '../model/ExceptionCode';
import { UnauthorizedException } from '@nestjs/common';

export default class IncorrectPasswordException extends UnauthorizedException {
  constructor(readonly code: ExceptionCode) {
    super(code);
  }
}
