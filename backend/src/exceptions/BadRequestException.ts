import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'model';

export class BadRequestException extends HttpException {
  constructor(message: ErrorCode) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
