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

    return result;
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
  public find({ name: fName, authors: fAuthors }: ISourceConstruct): number {
    const matches = this.mSources
      .map((source, index) => index)
      .filter((index: number): boolean => Boolean(this.mSources[index]))
      .filter((index: number): boolean => ('undefined' === typeof fName
        || fName === (this.mSources[index] as ISource).getName()))
      .filter((index: number): boolean => {
        if ('undefined' !== typeof fAuthors) {
          const sAuthors = (this.mSources[index] as ISource).getAuthors();
          if (fAuthors.length === 0) {
            return sAuthors.length === 0;
          }
          for (const author of fAuthors) {
            if (!sAuthors.includes(author)) {
              return false;
            }
          }
        }
        return true;
      });

    return matches.length ? matches[0] : -1;
  }

  /** Return the number of valid elements in this collection. */
  public count(): number {
    return this.mSources.filter(Boolean).length;
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
