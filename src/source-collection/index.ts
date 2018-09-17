import { Source } from '../source';
import { ISource, ISourceConstruct } from '../source/interface';
import { ISourceCollection } from './interface';

export class SourceCollection implements ISourceCollection {
  private readonly mSources: Array<ISource | null> = [];

  constructor(sources: ISourceConstruct[] = []) {
    sources.forEach((source: ISourceConstruct) => {
      this.add(source);
    });
  }

  public toJSON(): ISourceConstruct[] {
    const result: ISourceConstruct[] = [];

    this.forEach((source: ISourceConstruct) => {
      result.push(source);
    });

    return result.sort((aSource: ISourceConstruct, bSource: ISourceConstruct) => {
      const ajSource = JSON.stringify(aSource);
      const bjSource = JSON.stringify(bSource);

      if (ajSource > bjSource) {
        return -1;
      }
      if (ajSource < bjSource) {
        return 1;
      }
      return 0;
    });
  }

  public toArray(): ISourceConstruct[] {
    return this.toJSON();
  }

  /** Add a new element to the collection. */
  public add(source: ISourceConstruct): number {
    return this.mSources.push(new Source(source));
  }

  /** Check whether an element exists. */
  public has(source: ISourceConstruct): boolean {
    return -1 !== this.find(source);
  }

  /** Get the element at the given index. */
  public get(index: number): ISourceConstruct | null {
    const result = this.mSources[index];
    return result ? result.toJSON() : null;
  }

  /** Remove the element at the given index. */
  public rem(index: number): boolean {
    if (this.mSources[index]) {
      this.mSources[index] = null;
      return true;
    }
    return false;
  }

  /** Find the first index of an element that matches the given description. */
  public find(source: ISourceConstruct): number {
    let index = -1;
    const compare = JSON.stringify(new Source(source));
    this.forEach((iSource: ISourceConstruct, iIndex: number, terminator: () => void) => {
      if (compare === JSON.stringify(iSource)) {
        index = iIndex;
        terminator();
      }
    });
    return index;
  }

  /** Return the number of valid elements in this collection. */
  public count(): number {
    return this.mSources.filter((x) => x).length;
  }

  /** Iterate the valid elements in this collection. */
  public forEach(callback: (e: ISourceConstruct, i: number, t: () => void) => void): void {
    let stop = false;
    const terminate = (): void => { stop = true; };

    for (let iIndex = 0; !stop && iIndex < this.mSources.length; ++iIndex) {
      const iSource = this.mSources[iIndex];
      if (iSource) {
        callback(iSource.toJSON(), iIndex, terminate);
      }
    }
  }
}
