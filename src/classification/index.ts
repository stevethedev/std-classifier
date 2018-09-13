/**
 * This is the main Classification class. It represents a classification to the
 * "outside world", and is the main interface that developers should interact
 * through. It implements the co-located ClassificationInterface contract.
 */

import { IClassification, IClassificationConstructor } from './interface';

import { CLASSIFICATION_LEVEL, ClassificationLevel } from '../classification-level';
import { CodewordCollection } from '../codeword-collection';
import { Dissemination } from '../dissemination';
import { FgiCollection } from '../fgi/collection';
import { IFgiConstruct } from '../fgi/interface';
import { NonICMarkings } from '../non-ic-markings';

const reduceLevel = (level: ClassificationLevel, fgi: FgiCollection): string => {
  if (1 === fgi.size() && (level.getLevel() === CLASSIFICATION_LEVEL.UNCLASSIFIED)) {
    return '';
  }

  let maxLevel = level.getLevel();
  for (const { level: fgiLevel } of fgi.get()) {
    if (fgiLevel && (maxLevel < fgiLevel)) {
      maxLevel = fgiLevel;
    }
  }
  return (new ClassificationLevel(maxLevel)).toString();
};

export class Classification implements IClassification {
  public static deserialize(json: string): Classification {
    return new Classification(JSON.parse(json));
  }

  private mLevel: ClassificationLevel;
  private mCodewords: CodewordCollection;
  private mDissemination: Dissemination;
  private mFgi: FgiCollection;
  private mNonIC: NonICMarkings;

  public constructor({
    level,
    codewords,
    fgi,
    nonic,
    dissemination,
  }: IClassificationConstructor = {}) {
    this.mLevel = new ClassificationLevel(level);
    this.mCodewords = new CodewordCollection(codewords);
    this.mFgi = new FgiCollection(fgi);
    this.mDissemination = new Dissemination(dissemination);
    this.mNonIC = new NonICMarkings(nonic);
  }

  public toString(): string {
    const level = reduceLevel(this.mLevel, this.mFgi);
    const result: string[] = [
      this.mCodewords.toString(),
      this.mFgi.toString(this),
      this.mDissemination.toString(this),
      this.mNonIC.toString(),
    ].filter((x: string) => x);

    if (result.length) {
      return [level, ...result].join('//');
    }
    return level;
  }

  public toJSON(): IClassificationConstructor {
    return {
      codewords: this.mCodewords.toJSON(),
      dissemination: this.mDissemination.toJSON(),
      fgi: this.mFgi.toJSON(),
      level: this.mLevel.toJSON(),
      nonic: this.mNonIC.toJSON(),
    };
  }

  public serialize(): string {
    return JSON.stringify(this);
  }

  /*
   |---------------------------------------------------------------------------
   | Classification Level Functions
   |---------------------------------------------------------------------------
   */
  public setClassificationLevel(level: CLASSIFICATION_LEVEL): Classification {
    this.mLevel.setLevel(level);
    return this;
  }

  public getClassificationLevel(): CLASSIFICATION_LEVEL {
    return this.mLevel.getLevel();
  }

  /*
   |---------------------------------------------------------------------------
   | Codeword Functions
   |---------------------------------------------------------------------------
   */
  public getCodewords(): string[] {
    return this.mCodewords.toArray();
  }

  public addCodeword(...codewords: string[]): Classification {
    for (const codeword of codewords) {
      this.mCodewords.add(codeword);
    }
    return this;
  }

  public hasCodeword(codeword: string): boolean {
    return this.mCodewords.has(codeword);
  }

  public remCodeword(codeword: string): boolean {
    return this.mCodewords.rem(this.mCodewords.find(codeword));
  }

  /*
   |---------------------------------------------------------------------------
   | FGI Functions
   |---------------------------------------------------------------------------
   */
  public getFgi(): IFgiConstruct[] {
    return this.mFgi.get();
  }
  public addFgi(...fgis: IFgiConstruct[]): Classification {
    for (const fgi of fgis) {
      this.mFgi.add(fgi);
    }
    return this;
  }

  public hasFgi(fgi: string): boolean {
    return this.mFgi.has(fgi);
  }

  public remFgi(fgi: IFgiConstruct): boolean {
    return this.mFgi.rem(fgi.owner, fgi.level);
  }

  /*
   |---------------------------------------------------------------------------
   | Non-Intelligence Community Markings
   |---------------------------------------------------------------------------
   */
  public getNonIC(): string[] {
    return this.mNonIC.get();
  }
  public addNonIC(...nonIcs: string[]): Classification {
    for (const nonIc of nonIcs) {
      this.mNonIC.add(nonIc);
    }
    return this;
  }

  public hasNonIC(nonIc: string): boolean {
    return this.mNonIC.has(nonIc);
  }

  public remNonIC(nonIc: string): boolean {
    return this.mNonIC.rem(nonIc);
  }

  /*
   |---------------------------------------------------------------------------
   | Dissemination Functions
   |---------------------------------------------------------------------------
   */
  public setRsen(rsen: boolean): Classification {
    this.mDissemination.setRsen(rsen);
    return this;
  }
  public isRsen(): boolean {
    return this.mDissemination.isRsen();
  }

  public setRelido(relido: boolean): Classification {
    this.mDissemination.setRelido(relido);
    return this;
  }
  public isRelido(): boolean {
    return this.mDissemination.isRelido();
  }

  public setFouo(fouo: boolean): Classification  {
    this.mDissemination.setFouo(fouo);
    return this;
  }
  public isFouo(): boolean {
    return this.mDissemination.isFouo();
  }

  public setOrcon(orcon: boolean): Classification {
    this.mDissemination.setOrcon(orcon);
    return this;
  }
  public isOrcon(): boolean {
    return this.mDissemination.isOrcon();
  }

  public setNoforn(noforn: boolean): Classification {
    this.mDissemination.setNoforn(noforn);
    return this;
  }
  public isNoforn(): boolean {
    return this.mDissemination.isNoforn();
  }

  public setPropin(propin: boolean): Classification {
    this.mDissemination.setPropin(propin);
    return this;
  }
  public isPropin(): boolean {
    return this.mDissemination.isPropin();
  }

  public setDsen(dsen: boolean): Classification {
    this.mDissemination.setDsen(dsen);
    return this;
  }
  public isDsen(): boolean {
    return this.mDissemination.isDsen();
  }

  public getRel(): string[] {
    return this.mDissemination.getRel();
  }
  public addRel(...nations: string[]): Classification {
    for (const nation of nations) {
      this.mDissemination.addRel(nation);
    }
    return this;
  }
  public hasRel(nation: string): boolean {
    return this.mDissemination.hasRel(nation);
  }
  public remRel(nation: string): boolean {
    return this.mDissemination.remRel(nation);
  }

  public getEyes(): string[] {
    return this.mDissemination.getEyes();
  }
  public addEyes(...nations: string[]): Classification {
    for (const nation of nations) {
      this.mDissemination.addEyes(nation);
    }
    return this;
  }
  public hasEyes(nation: string): boolean {
    return this.mDissemination.hasEyes(nation);
  }
  public remEyes(nation: string): boolean {
    return this.mDissemination.remEyes(nation);
  }
}
