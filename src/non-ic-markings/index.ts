import { INonICMarkings } from './interface';

export class NonICMarkings implements INonICMarkings {
  private readonly mMarkings: string[] = [];

  constructor(nonIcs: string[] = []) {
    for (const nonIc of nonIcs) {
      this.add(nonIc);
    }
  }

  /**
   * Merge multiple NonICMarkings classes into this class.
   *
   * @param nonIcMarkings The instances to merge into this  one.
   */
  public combine(...nonIcMarkings: INonICMarkings[]): void {
    for (const nonIcMarking of nonIcMarkings) {
      for (const marking of nonIcMarking.get()) {
        this.add(marking);
      }
    }
  }

  public toString(): string {
    this.mMarkings.sort();
    return this.mMarkings.join(',');
  }

  public toJSON(): string[] {
    return this.mMarkings.map((marking: string) => marking);
  }

  public get(): string[] {
    return this.mMarkings.slice();
  }

  public add(nonIc: string): NonICMarkings {
    if (!this.has(nonIc)) {
      this.mMarkings.push(nonIc.toUpperCase());
    }
    return this;
  }

  public has(nonIc: string): boolean {
    for  (const marking of this.mMarkings) {
      if (marking.toUpperCase() === nonIc.toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  public rem(nonIc: string): boolean {
    const { length }: { length: number } = this.mMarkings;
    for (let iMarkings = 0; iMarkings < this.mMarkings.length; ++iMarkings) {
      if (this.mMarkings[iMarkings].toUpperCase() === nonIc.toUpperCase()) {
        this.mMarkings.splice(iMarkings--, 1);
      }
    }
    return length !== this.mMarkings.length;
  }
}
