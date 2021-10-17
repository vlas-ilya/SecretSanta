import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'model';

export class UnauthorizedException extends HttpException {
  constructor(message: ErrorCode) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
