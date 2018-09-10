/**
 * The Classification Level Interface establishes the contract for the
 * Classification Level class. It fulfills a similar function to  a
 * header file, decoupling class implementation from definition.
 */

import { CLASSIFICATION_LEVEL } from './enum';

export interface IClassificationLevel
{
  toString(): string;

  setLevel(level: CLASSIFICATION_LEVEL): IClassificationLevel;
  getLevel(): CLASSIFICATION_LEVEL;
};
