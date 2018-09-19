import { IReasonCollection } from './interface';

export class ReasonCollection implements IReasonCollection {
  private readonly mReasons: Array<string | null> = [];

  constructor(sources: string[] = []) {
    sources.forEach((source: string) => {
      this.add(source);
    });
  }

  public toJSON(): string[] {
    return this.mReasons.slice().filter((x) => x).sort() as string[];
  }

  public toArray(): string[] {
    return this.toJSON();
  }

  /** Add a new element to the collection. */
  public add(reason: string): number {
    let index = this.find(reason);
    if (-1 === index) {
      index = this.mReasons.push(`${reason}`.toLowerCase());
    }
    return index;
  }

  /** Check whether an element exists. */
  public has(reason: string): boolean {
    return -1 !== this.find(reason);
  }

  /** Get the element at the given index. */
  public get(index: number): string | null {
    const result = this.mReasons[index];
    return 'string' === typeof result ? result : null;
  }

  /** Remove the element at the given index. */
  public rem(index: number): boolean {
    if (this.mReasons[index]) {
      this.mReasons[index] = null;
      return true;
    }
    return false;
  }

  /** Find the first index of an element that matches the given description. */
  public find(reason: string): number {
    const lcReason = reason.toLowerCase();
    for (let iReason = 0; iReason < this.mReasons.length; ++iReason) {
      if (this.mReasons[iReason] === lcReason) {
        return iReason;
      }
    }
    return -1;
  }

  /** Return the number of valid elements in this collection. */
  public count(): number {
    return this.mReasons.filter((reason) => reason).length;
  }

  /** Iterate the valid elements in this collection. */
  public forEach(callback: (e: string, i: number, t: () => void) => void): void {
    let stop = false;
    const terminate = (): void => { stop = true; };

    for (let iIndex = 0; !stop && iIndex < this.mReasons.length; ++iIndex) {
      const iSource = this.mReasons[iIndex];
      if (iSource) {
        callback(iSource, iIndex, terminate);
      }
    }
  }
}
