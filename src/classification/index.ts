/**
 * This is the main Classification class. It represents a classification to the
 * "outside world", and is the main interface that developers should interact
 * through. It implements the co-located ClassificationInterface contract.
 */

import { IClassification, IClassificationConstructor } from './interface';

import { CLASSIFICATION_LEVEL, ClassificationLevel } from '../classification-level';
import { CodewordCollection } from '../codeword-collection';
import { Declassification } from '../declassification';
import { IDeclassificationOffset } from '../declassification/rule/interface';
import { Dissemination } from '../dissemination';
import { FgiCollection } from '../fgi-collection';
import { IFgiConstruct } from '../fgi/interface';
import { NonICMarkings } from '../non-ic-markings';
import { ReasonCollection } from '../reason-collection';
import { SourceCollection } from '../source-collection';
import { ISourceConstruct } from '../source/interface';

const reduceLevel = (level: ClassificationLevel, fgi: FgiCollection): string => {
  let maxLevel = level.getLevel();

  if (1 === fgi.getOwners().length && (maxLevel === CLASSIFICATION_LEVEL.UNCLASSIFIED)) {
    return '';
  }

  fgi.forEach(({ level: fgiLevel }: IFgiConstruct) => {
    if (fgiLevel && (maxLevel < fgiLevel)) {
      maxLevel = fgiLevel;
    }
  });

  return (new ClassificationLevel(maxLevel)).toString();
};

export class Classification implements IClassification {
  public static levels: (typeof CLASSIFICATION_LEVEL) = CLASSIFICATION_LEVEL;

  public static deserialize(json: string): Classification {
    return new Classification(JSON.parse(json));
  }
  public static addDeclassificationRule(name: string, offset: IDeclassificationOffset): void {
    Declassification.addRule(name, offset);
  }

  private readonly mLevel: ClassificationLevel;
  private readonly mCodewords: CodewordCollection;
  private readonly mDissemination: Dissemination;
  private readonly mFgi: FgiCollection;
  private readonly mNonIC: NonICMarkings;
  private readonly mDeclassification: Declassification;
  private readonly mSources: SourceCollection;
  private readonly mReasons: ReasonCollection;

  public constructor({
    level,
    codewords,
    fgi,
    nonic,
    dissemination,
    declassification,
    sources,
    reasons,
  }: IClassificationConstructor = {}) {
    this.mLevel = new ClassificationLevel(level);
    this.mCodewords = new CodewordCollection(codewords);
    this.mFgi = new FgiCollection(fgi);
    this.mDissemination = new Dissemination(dissemination);
    this.mNonIC = new NonICMarkings(nonic);
    this.mDeclassification = new Declassification(declassification);
    this.mSources = new SourceCollection(sources);
    this.mReasons = new ReasonCollection(reasons);
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
      declassification: this.mDeclassification.toJSON(),
      dissemination: this.mDissemination.toJSON(),
      fgi: this.mFgi.toJSON(),
      level: this.mLevel.toJSON(),
      nonic: this.mNonIC.toJSON(),
      reasons: this.mReasons.toJSON(),
      sources: this.mSources.toJSON(),
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
    return this.mFgi.toArray();
  }

  public addFgi(...fgis: IFgiConstruct[]): Classification {
    for (const fgi of fgis) {
      this.mFgi.add(fgi);
    }
    return this;
  }

  public hasFgi(fgi: IFgiConstruct): boolean {
    return this.mFgi.has(fgi);
  }

  public remFgi(fgi: IFgiConstruct): boolean {
    return this.mFgi.rem(this.mFgi.find(fgi));
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

  /*
   |---------------------------------------------------------------------------
   | Declassification Information
   |---------------------------------------------------------------------------
   */
  public getClassificationDate(): Date {
    return this.mDeclassification.getClassificationDate();
  }

  public setClassificationDate(date: string | Date | number): void {
    this.mDeclassification.setClassificationDate(date);
  }

  public setDeclassificationDate(date: Date | string | number | null): void {
    this.mDeclassification.setDate(date);
  }

  public getDeclassificationDate(): Date | null {
    // FGI information is exempt from declassification
    if (this.getFgi().length) {
      return null;
    }
    return this.mDeclassification.getDate();
  }

  public getDeclassificationRawDate(): Date | null {
    return this.mDeclassification.getRawDate();
  }

  public getDeclassificationExemption(): string | null {
    // FGI information is exempt from declassification
    if (this.getFgi().length) {
      return null;
    }
    return this.mDeclassification.getExemption();
  }

  public getDeclassificationExemptions(): string[] {
    return this.mDeclassification.getExemptionList();
  }

  public addDeclassificationExemption(...exemptions: string[]): void {
    exemptions.forEach((exemption: string) => this.mDeclassification.addExemption(exemption));
  }

  /*
   |---------------------------------------------------------------------------
   | Sources
   |---------------------------------------------------------------------------
   */
  public getSources(): ISourceConstruct[] {
    return this.mSources.toArray();
  }
  public addSource(...sources: ISourceConstruct[]): void {
    sources.forEach((source: ISourceConstruct) => {
      this.mSources.add(source);
    });
  }
  public getSource(index: number): ISourceConstruct | null {
    return this.mSources.get(index);
  }
  public hasSource(source: ISourceConstruct): boolean {
    return this.mSources.has(source);
  }
  public remSource(source: ISourceConstruct): boolean {
    return this.mSources.rem(this.mSources.find(source));
  }
  public getAuthor(iSource: number, iAuthor: number): string | null {
    const source: ISourceConstruct | null = this.mSources.get(iSource);
    if (source) {
      if (source.authors) {
        return source.authors[iAuthor] || null;
      }
    }
    return null;
  }

  /*
   |---------------------------------------------------------------------------
   | Classification Reasons
   |---------------------------------------------------------------------------
   */
  public getReasons(): string[] {
    return this.mReasons.toArray();
  }

  public addReason(...reasons: string[]): void {
    for (const reason of reasons) {
      this.mReasons.add(reason);
    }
  }

  public getReason(index: number): string | null {
    return this.mReasons.get(index);
  }

  public hasReason(reason: string): boolean {
    return this.mReasons.has(reason);
  }

  public remReason(reason: string): boolean {
    return this.mReasons.rem(this.mReasons.find(reason));
  }
}
