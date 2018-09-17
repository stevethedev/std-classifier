/**
 * This interface defines the API Contract that the Classification class must
 * abide by. It serves a similar function that a Header file would provide
 * in a C or C++ code-base by splitting definition from implementation.
 */

import { CLASSIFICATION_LEVEL } from '../classification-level/enum';
import { IDeclassificationConstruct } from '../declassification/interface';
import { IDisseminationConstruct } from '../dissemination/interface';
import { IFgiConstruct } from '../fgi/interface';

export interface IClassificationConstructor {
  level ?: CLASSIFICATION_LEVEL;
  codewords ?: string[];
  fgi ?: IFgiConstruct[];
  nonic ?: string[];
  dissemination ?: IDisseminationConstruct;
  declassification ?: IDeclassificationConstruct;
}

export interface IClassification {
  // This method is responsible for converting the class's internal data into
  // their textual representations in a way that reflects & adheres to the
  // current guidance. All conversion logic is completed by children.
  toString(): string;
  toJSON(): IClassificationConstructor;
  serialize(): string;

  // This method is responsible for setting the overall classification level
  // (i.e. UNCLASSIFIED, CONFIDENTIAL, SECRET, TOP SECRET). This function
  // accepts a proprietary numeric format to avoid close ties to en-US.
  setClassificationLevel(level: CLASSIFICATION_LEVEL): IClassification;
  getClassificationLevel(): CLASSIFICATION_LEVEL;

  getCodewords(): string[];
  addCodeword(...codeword: string[]): IClassification;
  hasCodeword(codeword: string): boolean;
  remCodeword(codeword: string): boolean;

  getFgi(): IFgiConstruct[];
  addFgi(...fgi: IFgiConstruct[]): IClassification;
  hasFgi(fgi: IFgiConstruct): boolean;
  remFgi(fgi: IFgiConstruct): boolean;

  getNonIC(): string[];
  addNonIC(nonIc: string): IClassification;
  hasNonIC(nonIc: string): boolean;
  remNonIC(nonIc: string): boolean;

  setRelido(relido: boolean): IClassification;
  isRelido(): boolean;

  setRsen(rsen: boolean): IClassification;
  isRsen(): boolean;

  setFouo(fouo: boolean): IClassification;
  isFouo(): boolean;

  setOrcon(orcon: boolean): IClassification;
  isOrcon(): boolean;

  setNoforn(noforn: boolean): IClassification;
  isNoforn(): boolean;

  setPropin(propin: boolean): IClassification;
  isPropin(): boolean;

  setDsen(dsen: boolean): IClassification;
  isDsen(): boolean;

  getRel(): string[];
  addRel(...nations: string[]): IClassification;
  hasRel(nation: string): boolean;
  remRel(nation: string): boolean;

  getEyes(): string[];
  addEyes(...nations: string[]): IClassification;
  hasEyes(nation: string): boolean;
  remEyes(nation: string): boolean;

  getClassificationDate(): Date;
  setClassificationDate(date: Date | string | number): void;
  getDeclassificationDate(): Date | null;
  setDeclassificationDate(date: Date | string | number | null): void;
  getDeclassificationRawDate(): Date | null;
  getDeclassificationExemption(): string | null;
  getDeclassificationExemptions(): string[];
  addDeclassificationExemption(...exemptions: string[]): void;
}
