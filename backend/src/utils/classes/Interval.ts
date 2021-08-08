import {
  END_SHOULD_BE_NOT_NULL,
  START_SHOULD_BE_GREATER_END,
  START_SHOULD_BE_NOT_NULL,
  isGreater,
  notNull,
} from '../validators';

export class Interval {
  constructor(private start: number, private end: number) {
    notNull(start, START_SHOULD_BE_NOT_NULL);
    notNull(end, END_SHOULD_BE_NOT_NULL);
    isGreater(start, end, START_SHOULD_BE_GREATER_END);
  }

  public include(value: number): boolean {
    return (
      value !== null && value !== undefined && value >= this.start && value <= this.end
    );
  }
}
