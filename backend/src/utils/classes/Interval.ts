import { isGreater, notNull } from '../validators';

import { BadRequestException } from '../../exceptions/BadRequestException';

export class Interval {
  constructor(private start: number, private end: number) {
    notNull(start, new BadRequestException('START_SHOULD_BE_NOT_NULL'));
    notNull(end, new BadRequestException('END_SHOULD_BE_NOT_NULL'));
    isGreater(start, end, new BadRequestException('START_SHOULD_BE_GREATER_END'));
  }

  public include(value: number): boolean {
    return (
      value !== null && value !== undefined && value >= this.start && value <= this.end
    );
  }
}
