/**
 * The Foreign Government Information (FGI) Interface defines the contract that
 * the FGI Class must abide by in interactions with the code-base. It fills
 * the same role as a header; separates implementation from definition.
 */

import { CLASSIFICATION_LEVEL } from '../classification-level/enum';

export interface IFgiConstruct {
  owner: string;
  level ?: CLASSIFICATION_LEVEL;
}

export interface IFgi {
  toString(): string;

  toJSON(): IFgiConstruct;

  getOwner(): string;

  getLevel(): CLASSIFICATION_LEVEL;
}
