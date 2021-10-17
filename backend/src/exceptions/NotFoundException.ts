import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'model';

export class NotFoundException extends HttpException {
  constructor(message: ErrorCode) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
