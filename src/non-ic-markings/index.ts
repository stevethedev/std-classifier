import { INonICMarkings } from './interface';

export class NonICMarkings implements INonICMarkings {
  private readonly mMarkings: string[] = [];

  constructor(nonIcs: string[] = []) {
    for (const nonIc of nonIcs) {
      this.add(nonIc);
    }
  }

  public toString(): string {
    this.mMarkings.sort();
    return this.mMarkings.join(',');
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
