import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'model';

export class ConflictException extends HttpException {
  constructor(message: ErrorCode) {
    super(message, HttpStatus.CONFLICT);
  }
}
