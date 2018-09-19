/**
 * The Classification Collection Interface is a specialization of the
 * Collection Interface, and is used as a header. This ensures that
 * the collection follows the contract but simplifies definitions.
 */

import { IClassification, IClassificationConstructor } from '../classification/interface';
import { ICollection } from '../collection/interface';

export interface IClassificationCollectionJson {
  classifications: IClassificationConstructor[];
}

export type IClassificationCollectionConstruct = IClassification[];

export interface IClassificationCollection extends ICollection<IClassification> {
  toJSON(): IClassificationCollectionJson;

  /** Collapse the collection into a single classification */
  reduce(): IClassification;

  find(classification: IClassification | IClassificationConstructor): number;
}
