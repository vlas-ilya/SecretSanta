import { isGreater, notNull } from '../validators';

export class Interval {
  constructor(private start: number, private end: number) {
    if (!notNull(start) || !notNull(end) || !isGreater(start, end)) {
      throw new Error();
    }
  }

  public include(value: number): boolean {
    return (
      value !== null && value !== undefined && value >= this.start && value <= this.end
    );
  }
}
