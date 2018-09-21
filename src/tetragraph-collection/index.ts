import { ITetragraph } from '../tetragraph/interface';
import { ITetragraphCollection } from './interface';

let SINGLETON: ITetragraphCollection | null = null;
export class TetragraphCollection implements ITetragraphCollection {
  public static getSingleton(): ITetragraphCollection {
    if (!SINGLETON) {
      SINGLETON = new TetragraphCollection();
    }
    return SINGLETON as TetragraphCollection;
  }

  private readonly mTetragraphs: Array<ITetragraph | null> = [];

  public add(tetragraph: ITetragraph): number {
    if (!this.has(tetragraph)) {
      return this.mTetragraphs.push(tetragraph);
    }
    return this.find(tetragraph);
  }

  public hasName(name: string): boolean {
    return this.findName(name) !== -1;
  }

  public has(tetragraph: ITetragraph): boolean {
    return this.find(tetragraph) !== -1;
  }

  public findName(name: string): number {
    let found: number = -1;
    this.forEach((tetragraph, index, terminate) => {
      if (tetragraph.getName() === `${name}`.toUpperCase()) {
        found = index;
        terminate();
      }
    });
    return found;
  }

  public find(tetragraph: ITetragraph): number {
    let found: number = -1;

    this.forEach((iTetragraph, index, terminate) => {
      if (tetragraph.getName() === iTetragraph.getName()) {
        found = index;
        terminate();
      }
    });

    return found;
  }

  public get(index: number): ITetragraph | null {
    if (this.mTetragraphs[index]) {
      return this.mTetragraphs[index];
    }
    return null;
  }

  public rem(index: number): boolean {
    if (this.get(index)) {
      this.mTetragraphs[index] = null;
      return true;
    }
    return false;
  }

  public count(): number {
    return this.mTetragraphs.filter(Boolean).length;
  }

  public forEach(callback: (e: ITetragraph, i: number, t: () => void) => void): void {
    let stop = false;
    const terminate = (): void => { stop = true; };

    for (let iTetragraph = 0; !stop && iTetragraph < this.mTetragraphs.length; ++iTetragraph) {
      const tetragraph = this.mTetragraphs[iTetragraph];

      if (tetragraph) {
        callback(tetragraph, iTetragraph, terminate);
      }
    }
  }
}
