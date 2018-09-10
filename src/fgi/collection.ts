import { Fgi } from '.';
import { CLASSIFICATION_LEVEL } from '../classification-level/enum';
import { IClassification } from '../classification/interface';
import { IFgiConstruct } from './interface';

export class FgiCollection {
  private mFgi: Fgi[] = [];

  constructor(fgis: IFgiConstruct[] = []) {
    for (const fgi of fgis) {
      this.add(fgi);
    }
  }

  public size(): number {
    return this.mFgi.length;
  }

  public get(): IFgiConstruct[] {
    return this.mFgi.map((fgi: Fgi) => ({
      level: fgi.getLevel(),
      owner: fgi.getOwner(),
    })) || [];
  }

  public add({ owner, level }: IFgiConstruct): FgiCollection {
    if (!this.has(owner)) {
      this.mFgi.push(new Fgi({ owner, level }));
    }
    return this;
  }

  public has(fgi: string, level ?: CLASSIFICATION_LEVEL): boolean {
    for (const item of this.mFgi) {
      if (item.getOwner() === fgi) {
        if (('undefined' === typeof level) || (item.getLevel() === level)) {
          return true;
        }
      }
    }
    return false;
  }

  public rem(fgi: string, level ?: CLASSIFICATION_LEVEL): boolean {
    const { length }: { length: number } = this.mFgi;
    for (let iFgi = 0; iFgi < this.mFgi.length; ++iFgi) {
      if (this.mFgi[iFgi].getOwner() === fgi) {
        if (('undefined' === typeof level)  || (this.mFgi[iFgi].getLevel() === level)) {
          this.mFgi.splice(iFgi--, 1);
        }
      }
    }
    return length !== this.mFgi.length;
  }

  public toString(classification: IClassification): string {
    if (0 === this.mFgi.length) {
      return '';
    }

    if (classification.getClassificationLevel() === CLASSIFICATION_LEVEL.UNCLASSIFIED) {
      if (1 === this.mFgi.length) {
        return this.mFgi[0].toString();
      }
    }

    return `FGI ${
      this.mFgi
        .map((fgi: Fgi) => fgi.getOwner())
        .sort()
        .filter((x: string) => x)
        .join(' ')
    }`;
  }

  public toJSON(): IFgiConstruct[] {
    return this.mFgi.map((fgi: Fgi) => fgi.toJSON());
  }
}
