import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor(message: String) {
    super(message, HttpStatus.CONFLICT);
  }
}
