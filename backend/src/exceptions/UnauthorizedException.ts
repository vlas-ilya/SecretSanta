import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(message: String) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
