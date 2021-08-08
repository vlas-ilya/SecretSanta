import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(message: String) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
