import { ExceptionCode } from '../model/ExceptionCode';
import { NotFoundException as NestNotFoundException } from '@nestjs/common';

export default class NotFoundException extends NestNotFoundException {
  constructor(readonly code: ExceptionCode) {
    super(code);
  }
}
