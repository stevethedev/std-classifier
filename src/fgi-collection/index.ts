import { CLASSIFICATION_LEVEL } from "../classification-level/enum";
import { IClassification } from "../classification/interface";
import { Fgi } from "../fgi";
import { IFgi, IFgiConstruct } from "../fgi/interface";
import { IFgiCollection } from "./interface";

const FGI_SORTER = (
  { owner: aOwner, level: aLevel }: IFgiConstruct,
  { owner: bOwner, level: bLevel }: IFgiConstruct
): number => {
  if (aOwner > bOwner) {
    return 1;
  }
  if (aOwner < bOwner) {
    return -1;
  }
  if (aLevel && bLevel) {
    if (aLevel > bLevel) {
      return 1;
    }
    if (aLevel < bLevel) {
      return -1;
    }
  }
  if (aLevel) {
    return 1;
  }
  if (bLevel) {
    return -1;
  }
  return 0;
};

export class FgiCollection implements IFgiCollection {
  private readonly mFgi: Array<IFgi | null> = [];

  constructor(fgis: IFgiConstruct[] = []) {
    for (const fgi of fgis) {
      this.add(fgi);
    }
  }

  public toArray(): IFgiConstruct[] {
    const array: IFgiConstruct[] = [];
    this.forEach((iFgi: IFgiConstruct) => {
      array.push(iFgi);
    });
    return array.sort(FGI_SORTER);
  }

  public toString(classification: IClassification): string {
    // Get the list of owners.
    const owners = this.getOwners();

    // No foreign government intelligence; just return a blank string.
    if (0 === owners.length) {
      return "";
    }

    // If there's only one classification owner, and the parent is (otherwise)
    // unclassified, then mark this using the foreign-intelligence (//-prefix).
    // Otherwise, we will skip this and fall into FGI.
    if (
      1 === owners.length &&
      classification.getClassificationLevel() ===
        CLASSIFICATION_LEVEL.UNCLASSIFIED
    ) {
      let maxLevel: undefined | number;
      this.forEach(({ owner, level }) => {
        if (level) {
          maxLevel = Math.max(level, maxLevel || 0);
        }
      });

      const fgi = this.mFgi[this.find({ owner: owners[0], level: maxLevel })];
      if (fgi) {
        return fgi.toString();
      }
    }

    // No special rules to apply, just FGI everyone together.
    return `FGI ${owners.sort().join(" ")}`;
  }

  public toJSON(): IFgiConstruct[] {
    const json: IFgiConstruct[] = [];
    for (const iFgi of this.mFgi) {
      if (iFgi) {
        json.push(iFgi.toJSON());
      }
    }
    return json.sort(FGI_SORTER);
  }

  public getOwners(): string[] {
    const owners: string[] = [];
    this.forEach(({ owner }) => {
      if (!owners.includes(owner)) {
        owners.push(owner);
      }
    });
    return owners;
  }

  /** Add a new element to the collection. */
  public add(construct: IFgiConstruct): number {
    let index = this.find(construct);
    if (-1 === index) {
      index = this.mFgi.push(new Fgi(construct)) - 1;
    }
    return index;
  }

  /** Check whether an element exists. */
  public has({ owner, level }: IFgiConstruct): boolean {
    let found = false;
    this.forEach((fgi: IFgiConstruct, index: number, terminate: () => void) => {
      if (fgi.owner === `${owner}`.toUpperCase()) {
        if ("undefined" === typeof level || fgi.level === level) {
          found = true;
          terminate();
        }
      }
    });
    return found;
  }

  /** Get the element at the given index. */
  public get(index: number): IFgiConstruct | null {
    const fgi = this.mFgi[index];
    if (fgi) {
      return {
        level: fgi.getLevel(),
        owner: fgi.getOwner()
      };
    }
    return null;
  }

  /** Remove the element at the given index. */
  public rem(index: number): boolean {
    if (this.get(index)) {
      this.mFgi[index] = null;
      return true;
    }
    return false;
  }

  /** Find the first index of an element that matches the given description. */
  public find({ owner, level }: IFgiConstruct): number {
    let index = -1;
    this.forEach((fgi: IFgiConstruct, iFgi: number, terminate: () => void) => {
      if (fgi.owner === owner) {
        if ("undefined" === typeof level || fgi.level === level) {
          index = iFgi;
          terminate();
        }
      }
    });
    return index;
  }

  /** Return the number of valid elements in this collection. */
  public count(): number {
    let count = 0;
    this.forEach(() => {
      ++count;
    });
    return count;
  }

  /** Iterate the valid elements in this collection. */
  public forEach(
    callback: (f: IFgiConstruct, i: number, t: () => void) => void
  ): void {
    let terminated = false;
    const terminate = (): void => {
      terminated = true;
    };

    for (let iFgi = 0; !terminated && iFgi < this.mFgi.length; ++iFgi) {
      const oFgi = this.get(iFgi);
      if (oFgi) {
        callback(oFgi, iFgi, terminate);
      }
    }
  }
}
